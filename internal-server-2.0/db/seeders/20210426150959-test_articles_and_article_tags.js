const { saveImagesFromUrl, rmSavedImages } = require('../../utils/saveImageFromUrl');

const articles = [{
  title: 'Распутываем спагетти-код: как писать поддерживаемый JavaScript',
  description: 'Список рекомендаций по процессу рефакторинга существующего кода...',
  link: 'http://prgssr.ru/development/rasputyvaem-spagetti-kod-kak-pisat-podderzhivaemyj-javascript.html#heading-section',
  url: 'http://prgssr.ru',
}, {
  title: 'description: "Welcome to Medium, a place where words matter. Medium taps into the brains of the world’s most insightful writers, thinkers, and storytellers to bring you the smartes...',
  description: 'Welcome to Medium, a place where words matter. Medium taps into the brains of the world’s most insightful writers, thinkers, and storytellers to bring you the smartes...',
  link: 'https://medium.com/@gamshan001/javascript-deep-copy-for-array-and-object-97e3d4bc401a',
  url: 'https://medium.com',
}, {
  title: 'Build a chat app with Firebase and Redux, part 1 – React Native Development – Medium',
  description: 'Today we’re building a chat app. The first and most important part of a chat app...',
  link: 'https://medium.com/react-native-development/build-a-chat-app-with-firebase-and-redux-part-1-8a2197fb0f88',
  url: 'https://medium.com',
}, {
  title: 'k88hudson/git-flight-rules',
  description: 'Flight rules for git. Contribute to k88hudson/git-flight-rules development by creating an account on GitHub.',
  link: 'https://github.com/k88hudson/git-flight-rules/blob/master/README_ru.md',
  url: 'https://github.com',
}];

const images = [{
  name: 'default_article_image0.jpeg',
  url: 'http://prgssr.ru/images/development/javascript/1459594112npm-outdated.png',
}, {
  name: 'default_article_image1.jpeg',
  url: 'https://avatars2.githubusercontent.com/u/1455535?s=400&v=4',
}, {
  name: 'default_article_image2.jpeg',
  url: 'https://cdn-images-1.medium.com/max/1200/1*L0zf9ap8xoInVbm78siJBA.png',
}, {
  name: 'default_article_image3.jpeg',
  url: 'https://cdn-images-1.medium.com/max/1200/1*XsaRsIEPbaG0gPoM1xEOaQ.png',
}];

const tags = [
  'javascript',
  'firebase',
  'data structure',
  'react native',
  'css',
  'hacks',
  'best practice',
  'git',
  'react',
  'machine learning',
  'python',
  'django-rest',
  'nodejs',
  'ssh',
  'docker',
  'typescript',
  'rest',
  'graphql',
];

const getArticleTags = (n, articlesField, tagsFields) => {
  const articleTags = [];

  const randomArticleId = () => {
    const randomIdentifier = Math.floor(Math.random() * articlesField.length);
    return articlesField[randomIdentifier].id;
  };

  for (let i = 0; i < n; i++) {
    const tag = tagsFields[i % tagsFields.length];
    articleTags.push({
      id: i + 1,
      article_id: randomArticleId(),
      tag_id: tag.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
  return articleTags;
};

module.exports = {
  up: async (queryInterface) => {
    const [users] = await queryInterface.sequelize.query('SELECT * FROM users');

    let count = 0;
    const articlesFields = [];
    users.forEach((user) => {
      const articleArr = articles.map((params, idx) => {
        ++count;
        const articleObj = {
          id: count,
          added_by: user.id,
          image: images[idx].name,
          createdAt: new Date(),
          updatedAt: new Date(),
          ...params,
        };
        return articleObj;
      });
      articlesFields.push(...articleArr);
    });
    await queryInterface.bulkInsert('articles', articlesFields);

    const tagsFields = tags.map((tagName, idx) => ({
      id: idx + 1,
      title: tagName,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
    await queryInterface.bulkInsert('tags', tagsFields);

    const articleTagsFields = getArticleTags(20, articlesFields, tagsFields);
    await queryInterface.bulkInsert('article_tags', articleTagsFields);

    await saveImagesFromUrl(images);
  },

  down: async (queryInterface) => {
    rmSavedImages(images);
    await queryInterface.bulkDelete('articles', null, {});
    await queryInterface.bulkDelete('tags', null, {});
    await queryInterface.bulkDelete('article_tags', null, {});
  },
};
