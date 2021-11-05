const { saveImagesFromUrl, rmSavedImages } = require('../../utils/saveImageFromUrl');

const defaultImages = [
  {
    url: 'https://st3.depositphotos.com/2379655/i/600/depositphotos_194980898-stock-photo-cheerful-woman-holding-blackboard-advertising.jpg',
    name: 'default_announcement_imag0.jpeg',
  }, {
    url: 'https://st3.depositphotos.com/2379655/i/600/depositphotos_194980854-stock-photo-cheerful-woman-holding-blackboard-advertising.jpg',
    name: 'default_announcement_image1.jpeg',
  },
];

module.exports = {
  up: async (queryInterface) => {
    await saveImagesFromUrl(defaultImages);
    const [users] = await queryInterface.sequelize.query('SELECT * FROM users');

    const userFields = users.map((user) => ({
      id: user.id,
      title: `Test announcement title #${user.id}`,
      description: 'Test User announcement descritiption with a big amount of text',

      hidden: Boolean(Math.round(Math.random())),
      images: [
        defaultImages[0].name,
        defaultImages[1].name,
      ],

      author_id: user.id,
      visitDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('announcements', userFields, {});
  },

  down: async (queryInterface, Sequelize) => {
    rmSavedImages(defaultImages);

    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('announcements', {
      title: {
        [Op.startsWith]: 'Test announcement title',
      },
    }, {});
  },
};
