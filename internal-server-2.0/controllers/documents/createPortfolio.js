const config = require('../../config');
const { generatePdf, TEMPLATE_NAMES } = require('../../utils/generatePdf');

const createPortfolio = async (req, res, next) => {
  try {
    const { projects, mainTitle } = req.body;

    const data = {
      mainTitle: mainTitle || 'OUR BIG TITLE THERE. CAN BE IN TWO LINES.',
      projects,
      images: {
        white: `${config.urls.staffOld}/public/static/white.png`,
        headerLogo: `${config.urls.staffOld}/public/static/portfolio_images/white.png`,
        teamName: `${config.urls.staffOld}/public/static/portfolio_images/team-name.png`,
        clutch: `${config.urls.staffOld}/public/static/portfolio_images/sm_icons/ic_clutch.svg`,
        facebook: `${config.urls.staffOld}/public/static/portfolio_images/sm_icons/ic_facebook.svg`,
        goodfirms: `${config.urls.staffOld}/public/static/portfolio_images/sm_icons/ic_goodfirms.svg`,
        linkedin: `${config.urls.staffOld}/public/static/portfolio_images/sm_icons/ic_linkedin.svg`,
        mail: `${config.urls.staffOld}/public/static/portfolio_images/sm_icons/ic_mail.svg`,
        upwork: `${config.urls.staffOld}/public/static/portfolio_images/sm_icons/ic_upwork.svg`,
        vkontakte: `${config.urls.staffOld}/public/static/portfolio_images/sm_icons/ic_vkontakte.svg`,
      },
    };

    const pdf = await generatePdf(data, TEMPLATE_NAMES.portfolio);
    res.setHeader('Content-Disposition', 'attachment; filename=portfolio.pdf');
    res.type('application/pdf').end(pdf);
  } catch (err) {
    err.functionName = createPortfolio.name;
    err.fileName = __filename;
    next(err);
  }
};

module.exports = createPortfolio;
