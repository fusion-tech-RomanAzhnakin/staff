const path = require('path');
const puppeteer = require('puppeteer');
const handlebars = require('handlebars');
const util = require('util');
const fs = require('fs');

const readFile = util.promisify(fs.readFile);

const TEMPLATE_NAMES = {
  portfolio: 'portfolio',
};

const generatePdf = async (data, templateName) => {
  const content = await readFile(path.resolve(`templates/${templateName}`, `${templateName}.hbs`), 'utf8');
  const template = handlebars.compile(content);
  const html = template(data);

  const browser = await puppeteer.launch({
    // change the headless value to false to check if a file is open in a browser window
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setContent(html);
  await page.evaluateHandle('document.fonts.ready');
  const pdf = await page.pdf({
    format: 'A4',
    landscape: true,
    printBackground: true,
  });

  await browser.close();
  return pdf;
};

module.exports = {
  generatePdf,
  TEMPLATE_NAMES,
};
