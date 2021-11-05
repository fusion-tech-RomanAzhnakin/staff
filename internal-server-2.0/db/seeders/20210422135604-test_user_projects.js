const { saveImagesFromUrl, rmSavedImages } = require('../../utils/saveImageFromUrl');

// Change to s3 bucket when it will be ready
const defaultImages = [
  {
    url: 'https://as1.ftcdn.net/jpg/02/00/75/34/500_F_200753403_AqjDIuxmuq8GzVa7dVbTO8QH6zfl2TK3.jpg',
    name: 'default_project_image0.jpg',
  }, {
    url: 'https://www.logicdesign.co.uk/wp-content/uploads/dlanor-s-703975-unsplash-1500x900.jpg',
    name: 'default_project_image1.jpg',
  }, {
    url: 'https://www.hackingwithswift.com/uploads/matrix.jpg',
    name: 'default_project_image2.jpg',
  },
];

const projects = [{
  id: 1,
  title: 'CloudPano',
  description: 'This cloud-based software features panoramic 360-degree views, with its primary goal being to make it possible for businesses to create and publish virtual tours that facilitate sales and marketing of products and services. The product is particularly popular among real estate agencies and already enjoys a considerable client base',
  description_ru: 'This cloud-based software features panoramic 360-degree views, with its primary goal being to make it possible for businesses to create and publish virtual tours that facilitate sales and marketing of products and services. The product is particularly popular among real estate agencies and already enjoys a considerable client base.ƒ',
  status: 'Good',
}, {
  id: 2,
  title: 'Poker Stars',
  description: "PokerStars is the largest online poker resource in the world. All major types are available to play, including Texas Hold'em, Omaha and Stud. The game is played for 'play money' or US dollars, with stakes ranging from $ 0.01 / $ 0.02 to $ 1000 / $ 2000. On average, at least 90 thousand players simultaneously play on the site.",
  description_ru: 'PokerStars — крупнейший онлайн ресурс для игры покер в мире. Для игры доступны все основные виды, в том числе техасский холдем, омаха и стад. Игра проходит на «условные деньги» или американские доллары, со ставками от $0,01/$0,02 до $1000/$2000. В среднем, на сайте одновременно играет не менее 90 тыс. игроков.',
  status: 'Medium Well',
  href: 'https://yandex.ru/',
}, {
  id: 3,
  title: 'Test project',
  description: 'Small description',
}, {
  id: 4,
  title: 'Amazon Web Services',
  description: 'Amazon Web Services is a commercial public cloud supported and developed by Amazon since 2006',
  description_ru: 'Amazon Web Services — коммерческое публичное облако, поддерживаемое и развиваемое компанией Amazon с 2006 года. Предоставляет подписчикам услуги как по инфраструктурной модели, так и платформенного уровня.',
  status: 'Done',
  href: 'https://google.com/',
}, {
  id: 5,
  title: 'Second test Project',
}];

const getTimes = {
  createdAt: new Date(),
  updatedAt: new Date(),
};

const getProjectImage = (number) => (`default_project_image${number}.jpg`);

const getProject = ({ title, description, description_ru, status, href, id }) => ({
  id,
  title,
  description,
  description_ru,
  status,
  href,
  images: [
    getProjectImage(Math.floor(Math.random() * defaultImages.length)),
  ],
  ...getTimes,
});

// Passing throught project n times & adds random technologies to them
// In result n project_technologies
const getProjectTechnologies = (n, technologies) => {
  const projectTechnologies = [];

  for (let i = 0; i < n; i++) {
    const currentProject = projects[i % projects.length];
    projectTechnologies.push({
      id: i + 1,
      technology_id: Math.floor(Math.random() * technologies.length + 1),
      project_id: currentProject.id,
      ...getTimes,
    });
  }

  return projectTechnologies;
};

const getUserProjects = (users) => {
  let count = 0;
  const userProjectFileds = [];

  users.forEach((user) => {
    projects.forEach((project) => {
      count++;
      userProjectFileds.push({
        id: count,
        project_id: project.id,
        user_id: user.id,
        ...getTimes,
      });
    });
  });

  return userProjectFileds;
};

module.exports = {
  up: async (queryInterface) => {
    const projectsFields = projects.map((params) => getProject({ ...params }));
    await queryInterface.bulkInsert('projects', projectsFields, {});

    const [technologies] = await queryInterface.sequelize.query('SELECT * FROM technologies');
    const projectTechnologiesFields = getProjectTechnologies(15, technologies);
    await queryInterface.bulkInsert('project_technologies', projectTechnologiesFields, {});

    const [users] = await queryInterface.sequelize.query('SELECT * FROM users');
    const userProjectFileds = getUserProjects(users);
    await queryInterface.bulkInsert('user_projects', userProjectFileds, {});

    await saveImagesFromUrl(defaultImages);
  },

  down: async (queryInterface) => {
    rmSavedImages(defaultImages);

    await queryInterface.bulkDelete('technologies', null, {});
    await queryInterface.bulkDelete('projects', null, {});

    await queryInterface.bulkDelete('project_technologies', null, {});
    await queryInterface.bulkDelete('user_projects', null, {});
  },
};
