const yup = require('yup');

const portfolio = {
  body: {
    mainTitle: yup.string().nullable(true),
    projects: yup.array(yup.object().shape({
      description: yup.string().nullable(true),
      description_ru: yup.string().nullable(true),
      title: yup.string().nullable(true),
      role: yup.array(yup.object().shape({
        title: yup.string().nullable(true),
        text: yup.string().nullable(true),
      })),
      technologies: yup.array(yup.object().shape({
        title: yup.string().nullable(true),
      })),
    })),
  },
};

module.exports = {
  portfolio,
};
