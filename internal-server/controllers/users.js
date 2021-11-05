const jwt = require('jsonwebtoken');
const config = require('../config');
const db = require('../models/index');
const hash = require('../utils/hash');
const createToken = require('../utils/createToken');
const { parseStringToArray } = require('../utils/image');
const { updateUserConversationId } = require('../slackBot/usersData');
const {
  saveImageBuffer,
  deleteFileIfExists,
  generateNameForFile,
  compressImageBuffer,
} = require('../utils/compressImageUtils');

const { Op } = db.Sequelize;

/**
 * @swagger
 * definitions:
 *   UserModel:
 *     type: object
 *     properties:
 *       firstName:
 *         type: string
 *       lastName:
 *         type: string
 *       login:
 *         type: string
 *       info:
 *         type: string
 *       email:
 *         type: string
 *       password:
 *         type: string
 *       DoB:
 *         type: string
 *         format: date-time
 *       phone:
 *         type: string
 *       slack_name:
 *         type: string
 *       slack_conversational_id:
 *         type: string
 *       slack_conversational_crm_id:
 *         type: string
 *       role:
 *         type: string
 *         enum: ['student', 'user', 'sales', 'admin']
 *       repo:
 *         type: string
 *       resetPasswordExpires:
 *         type: string
 *         format: date-time
 *       resetPasswordToken:
 *         type: string
 *       status:
 *         type: string
 *         enum: ['registered', 'active', 'disabled']
 */

/**
 * @swagger
 *
 * /api/users/{login}:
 *   get:
 *     summary: GET user by login
 *     parameters:
 *       - in: path
 *         name: login
 *         schema:
 *           type: string
 *         description: user's login
 *     tags:
 *       - users
 *     responses:
 *       200:
 *         description: user
 */

const getUser = async (req, res) => {
  /* TODO
  Here is trouble with socket: previous version of code https://gitlab.com/fusion.team.llc/internal-server/blob/e9784b6d51b98c763d6e3342d32b8c1c30599500/controllers/users.js#L13
  leads to error 'TypeError: res.status is not a function'
  The reason comes from sockets/route.js (line 34) where res is not Response object
  */
  const { login } = req.params;
  db.user
    .findOne({
      where: { login },
      attributes: {
        exclude: [
          'password',
          'updatedAt',
          'resetPasswordExpires',
          'resetPasswordToken',
        ],
      },
    })
    .then((user) => {
      if (!user) {
        return res.send(null);
      }

      return res.send(user.get());
    })
    .catch((err) => {
      console.error('getUser error', err);
      return res.send(null);
    });
};

/**
 * @swagger
 *
 * /api/users/:
 *   get:
 *     summary: GET filtered and sorted user list
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               filter:
 *                 type: object
 *                 description: filter for where
 *                 properties:
 *                   name:
 *                     type: string
 *                   notRole:
 *                     type: string
 *                   status:
 *                     type: string
 *               sort:
 *                 type: array
 *                 collectionFormat: multi
 *                 items:
 *                   type: "string"
 *                 example: [id, asc]
 *               description: sorting parameters
 *         in: body
 *     tags:
 *       - users
 *     responses:
 *       200:
 *         description: user
 */

const getUsers = async (req, res) => {
  const { filter, sort = ['lastName', 'ASC'] } = req.query;

  try {
    const parsedFilter = filter
      ? JSON.parse(filter)
      : { notRole: 'student', status: 'active' };

    const users = await db.user.findAll({
      where: makeFilter(parsedFilter),
      order: [sort, ['id', 'ASC']],
      attributes: [
        'login',
        'id',
        'avatar',
        'avatarThumbnail',
        'firstName',
        'lastName',
        'firstName_ru',
        'lastName_ru',
        'email',
        'phone',
        'status',
        'role',
        'tech_role',
        'mentor_id',
        'education',
        'education_ru',
        'DoB',
        'isDev',
      ],
    });

    return res.status(200).send(users);
  } catch (err) {
    console.error('getUsers error:', err);
    return res.status(500).send(err.message);
  }
};

/**
 * @swagger
 *
 * /api/users/editUser:
 *   put:
 *     summary: edit user record
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/UserModel'
 *     tags:
 *      - users
 *     responses:
 *       200:
 *         description: user updated
 *       500:
 *         description: error message
 *
 */

const editUser = async (req, res) => {
  try {
    if (!req.passwordCheck) {
      throw new Error('Wrong password');
    }
    const { slack_name } = req.body;
    // If slack_name was changed
    if (slack_name && slack_name !== req.userData.slack_name) {
      await updateUserConversationId(req, req.userData.role);
    }
    const { slack_conversational_id, ...restData } = req.body;

    restData.repo = parseStringToArray(restData.repo);

    if (restData.newPassword) {
      restData.password = hash(restData.newPassword);
    } else {
      delete restData.password;
    }

    restData.login = restData.newLogin;

    delete restData.newLogin;
    delete restData.createdAt;
    delete restData.newPassword;

    let user = await db.user.update(restData, {
      where: { login: req.userData.login },
      individualHooks: true,
    });
    user = user[1][0].dataValues;

    delete user.password;
    delete user.updatedAt;

    const token = createToken(user, req.secret);

    return res.send({
      cookie: `${config.token_name}=${token};path=/;`,
      user,
      status: '200',
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 * @swagger
 *
 * /api/users/adminChange/{id}:
 *   put:
 *     summary: edit user record
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         description: user db Pkey
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *         schema:
 *           $ref: '#/definitions/UserModel'
 *     tags:
 *      - users
 *     responses:
 *       200:
 *         description: user updated
 *       403:
 *         description: invalid token
 *       500:
 *         description: erroe message
 *
 */

const adminChange = async (req, res) => {
  try {
    let data = req.body;
    const { id } = req.params;
    const { role: newRole } = data;

    jwt.verify(data.cookie, req.secret);
    delete data.cookie;

    const user = await db.user.findByPk(id);

    if (user.role === 'admin' && req.user.role !== 'admin') {
      return res
        .status(403)
        .json({ message: 'You have no permissions to do that' });
    }

    if (req.user.role === 'admin') {
      data.isDev = req.body.isDev !== undefined ? req.body.isDev : user.isDev;
    } else {
      delete data.isDev;
    }

    if (req.user.role === 'hr') {
      data = {};
      if (req.body.status) {
        data.status = req.body.status;
      }
    }

    const { role: curRole, login, slack_name } = user;

    const isIntern = newRole === 'student';
    const isInternToUsers = curRole === 'student' && newRole !== 'student';

    if (newRole && (isIntern || isInternToUsers)) {
      const preventThrow = true;
      await updateUserConversationId(
        req,
        newRole,
        login,
        slack_name,
        preventThrow
      );
    }

    await db.user.update(data, {
      where: { id },
      individualHooks: true,
    });

    return res.status(200).send('success');
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const newAvatar = async (req, res) => {
  const login = req.params.id;
  const pathToDirectory = 'public/uploads/';

  try {
    const incomingUser = await db.user.findOne({
      where: {
        login,
      },
    });

    if (incomingUser.avatar) {
      const oldPath = incomingUser.avatar.substr(1);
      const thumbnailPath = incomingUser.avatarThumbnail.substr(1);

      await deleteFileIfExists(oldPath);
      await deleteFileIfExists(thumbnailPath);
    }

    const newAvatarFileName = await generateNameForFile();

    const compressedAvatarBuffer = await compressImageBuffer(
      req.file.buffer,
      config.avatarResize,
      config.avatarCompresOptions
    );
    const newAvatarPath = await saveImageBuffer(
      pathToDirectory,
      newAvatarFileName,
      compressedAvatarBuffer
    );

    const compressedAvatarThubnailBuffer = await compressImageBuffer(
      req.file.buffer,
      config.avatarThumbnailResize
    );
    const newAvatarThumbnailPath = await saveImageBuffer(
      pathToDirectory,
      `${newAvatarFileName}_thumbnail`,
      compressedAvatarThubnailBuffer
    );

    let user = await db.user.update(
      {
        avatar: `/${newAvatarPath}`,
        avatarThumbnail: `/${newAvatarThumbnailPath}`,
      },
      {
        where: { login },
        individualHooks: true,
        returns: true,
      }
    );

    user = user[1][0].toJSON();
    delete user.password;

    const token = createToken(user, req.secret);
    return res.send({
      cookie: `${config.token_name}=${token}; path=/`,
      user,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const makeFilter = (filter = {}) => {
  const filterParams = {};
  const namePattern = { [Op.iLike]: `%${filter.name}%` };
  console.log(namePattern);

  if (filter.name) {
    filterParams[Op.or] = [
      {
        login: namePattern,
      },
      {
        firstName: namePattern,
      },
      {
        firstName_ru: namePattern,
      },
      {
        lastName: namePattern,
      },
      {
        lastName_ru: namePattern,
      },
    ];
  }
  if (filter.notRole) {
    filterParams.role = { [db.Sequelize.Op.not]: filter.notRole };
  }
  if (filter.role) {
    filterParams.role = filter.role;
  }
  if (filter.status) {
    filterParams.status = filter.status;
  }
  return filterParams;
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const foundedUser = await db.user.findById(userId);

    if (!foundedUser) {
      return res.status(404).json({ message: 'user not found' });
    }

    if (foundedUser.status !== 'disabled') {
      return res.status(403).json({ message: 'status is not disabled' });
    }

    const user = await db.user.destroy({ where: { id: foundedUser.id } });
    return res.json(user);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getUser,
  getUsers,
  editUser,
  adminChange,
  newAvatar,
  deleteUser,
};
