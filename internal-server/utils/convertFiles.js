// @ts-check
const db = require('../models');
const { readFilePromise } = require('./fsPromisify');
const config = require('../config');
const {
  saveImageBuffer,
  deleteFileIfExists,
  generateNameForFile,
  compressImageBuffer,
} = require('./compressImageUtils');

const uploadsPath = '../public/uploads/';

const convertFiles = async () => {
  const users = await db.user.findAll();
  console.log('start converting');
  const avatarPromises = users.map(async (user) => {
    if (!user.avatar) {
      return;
    }

    const avatarPath = `..${user.avatar}`;
    const avatarThumbnailPath = `..${user.avatarThumbnail}`;

    try {
      const avatarImageBuffer = await readFilePromise(avatarPath);

      const newAvatarFileName = await generateNameForFile(uploadsPath);

      const compressedAvatarBuffer = await compressImageBuffer(
        avatarImageBuffer,
        config.avatarResize,
        config.avatarCompresOptions
      );
      const newAvatarPath = await saveImageBuffer(
        uploadsPath,
        newAvatarFileName,
        compressedAvatarBuffer
      );

      const compressedAvatarThumbnailBuffer = await compressImageBuffer(
        avatarImageBuffer,
        config.avatarThumbnailResize
      );
      const newAvatarThumbnailPath = await saveImageBuffer(
        uploadsPath,
        `${newAvatarFileName}_thumbnail`,
        compressedAvatarThumbnailBuffer
      );

      await db.user.update(
        {
          avatar: newAvatarPath.substr(2),
          avatarThumbnail: newAvatarThumbnailPath.substr(2),
        },
        {
          where: { id: user.id },
          individualHooks: true,
        }
      );

      await deleteFileIfExists(avatarPath);
      await deleteFileIfExists(avatarThumbnailPath);

      return {
        newAvatarPath,
        newAvatarThumbnailPath,
      };
    } catch (error) {
      console.log(error);
      return error.message;
    }
  });

  const result = await Promise.all(avatarPromises);

  console.log('converting is finished', result);

  process.exit(1);
};

convertFiles();
