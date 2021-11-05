const path = require('path');
const handlebars = require('handlebars');
const util = require('util');
const fs = require('fs');

const readFile = util.promisify(fs.readFile);

const compilePartials = async () => {
  return Promise.all(
    fs.readdirSync(`${__dirname}/`)
      .map(async (name) => {
        const isDir = fs.lstatSync(`${__dirname}/${name}`).isDirectory();

        if (!isDir) { return; }

        const partialsNameList = fs.readdirSync(`${__dirname}/${name}/`)
          .filter((fileName) => path.extname(fileName) === '.hbs' && fileName !== `${name}.hbs`);

        await Promise.all(partialsNameList.map(async (fileName) => {
          const createPath = path.resolve(`${__dirname}/${name}/${fileName}`);
          handlebars.registerPartial(
            fileName,
            await readFile(createPath, 'utf-8'),
          );
        }));

        handlebars.registerHelper('createStringList', (arr) => {
          return new handlebars.SafeString(arr);
        });
      }),
  );
};

module.exports = compilePartials;
