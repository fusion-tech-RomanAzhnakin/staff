const hash = require('../../utils/hash');
const { saveImageFromUrl, rmSavedImage } = require('../../utils/saveImageFromUrl');

// Change to s3 bucket when it will be ready
const defaultPhotoUrl = 'https://st3.depositphotos.com/1767687/16607/v/600/depositphotos_166074422-stock-illustration-default-avatar-profile-icon-grey.jpg';
const defaultPhotoName = 'default_user_avatar.jpeg';
const userRoles = ['student', 'user', 'mentor', 'hr', 'sales', 'admin', 'officeManager'];

module.exports = {
  up: async (queryInterface) => {
    await saveImageFromUrl(defaultPhotoUrl, defaultPhotoName);

    const fields = userRoles.map((roleName, idx) => {
      const ucFirstRoleName = `${roleName[0].toUpperCase()}${roleName.slice(1)}`;

      const addedRepos = roleName === 'student' || roleName === 'admin' || roleName === 'user'
        ? [
          'https://gitlab.com/fusion-internal-products',
          'https://github.com/fusion-tech-pro',
        ]
        : null;

      const mentorId = roleName === 'student' || roleName === 'user'
        ? 3
        : null;

      return {
        id: idx + 1,
        firstName: ucFirstRoleName,
        firstName_ru: 'Пользователь',
        lastName: 'Test',
        lastName_ru: 'Тестовый',
        education: `${ucFirstRoleName}'s education`,
        education_ru: 'Образование пользователя',
        info: 'Информация пользователя',
        phone: '+7777 7777777',
        email: `${roleName}@email.com`,
        password: hash('asdasd'),
        role: roleName,
        avatar: `/public/${defaultPhotoName}`,
        avatarThumbnail: `/public/${defaultPhotoName}`,
        status: 'active',
        DoB: new Date(1970),
        slack_name: 'Test user',

        login: roleName,
        repo: addedRepos,
        mentor_id: mentorId,

        isDev: true,
        resetPasswordExpires: new Date(2030),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });

    await queryInterface.bulkInsert('users', fields, {});
  },

  down: async (queryInterface) => {
    rmSavedImage(defaultPhotoName);

    await queryInterface.bulkDelete('users', {
      lastName: 'Test',
      isDev: true,
    }, {});
  },
};
