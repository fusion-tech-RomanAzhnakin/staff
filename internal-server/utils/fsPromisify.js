// @ts-check
const fs = require('fs');
const util = require('util');

/**
 * @typedef {Object} PromisifyFs
 * @property {(path: string) => Promise<Buffer>}PromisifyFs.readFilePromise
 * @property {(path: string, mode?: number) => Promise<boolean>} PromisifyFs.existsFile
 * @property {(path: string) => Promise<undefined>} PromisifyFs.unlinkPromise
 */

/**
 * @type {PromisifyFs}
 */
module.exports = {
  readFilePromise: util.promisify(fs.readFile),
  existsFile(...args) {
    return new Promise((resolve) => {
      fs.access(...args, (err) => {
        if (err) resolve(false);
        return resolve(true);
      });
    });
  },
  unlinkPromise: util.promisify(fs.unlink),
};
