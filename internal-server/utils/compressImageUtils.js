// @ts-check
const sharp = require('sharp');
const { uid } = require('uid');
const _isEmpty = require('lodash/isEmpty');
const { unlinkPromise, existsFile } = require('./fsPromisify');

/**
 * @typedef {Object} resize
 * @property {number} resize.width
 * @property {number} resize.height
 */

/**
 * @param {Buffer} buffer - image buffer
 * @param {resize} resize
 * @param {sharp.PngOptions=} compressOptions
 * @returns {Promise<Buffer>}
 */
const compressImageBuffer = async (buffer, resize, compressOptions) => {
  const inputImage = sharp(buffer);
  const imageMetadata = await inputImage.metadata();

  const heightResize = imageMetadata.height > resize.height ? resize.height : null;
  const widthResize = imageMetadata.width > resize.width ? resize.width : null;

  let convertedImage = inputImage;

  const newResize = {};
  if (heightResize) {
    newResize.height = heightResize;
  }
  if (widthResize) {
    newResize.width = widthResize;
  }
  if (!_isEmpty(newResize)) {
    convertedImage = convertedImage.resize(newResize);
  }

  if (compressOptions) {
    convertedImage = convertedImage.png(compressOptions);
  }

  const convertImageBuffer = await convertedImage.toBuffer();
  return convertImageBuffer;
};

/**
 *
 * @param {File | Blob} file
 * @param {resize} resize
 * @param {sharp.PngOptions=} compressOptions
 */
const compressFileImage = async (file, resize, compressOptions) => {
  const arrayBufferFromFile = await file.arrayBuffer();
  const fileBuffer = Buffer.from(arrayBufferFromFile);
  const compressedImageBuffer = await compressImageBuffer(
    fileBuffer,
    resize,
    compressOptions
  );
  return compressedImageBuffer;
};

/**
 * @param {string} path
 * @param {number=} uidLength
 * @returns {Promise<string>}
 */
const generateNameForFile = async (path, uidLength = 25) => {
  const newFileUid = uid(uidLength);
  const isFileExist = await existsFile(`${path}${newFileUid}`);
  if (isFileExist) {
    return generateNameForFile(path, uidLength);
  }
  return newFileUid;
};

/**
 * @param {string} path - path to file
 */
const deleteFileIfExists = async (path) => {
  const isFileExist = await existsFile(path);
  if (isFileExist) {
    await unlinkPromise(path);
  }
};

/**
 * @param {string} path
 * @param {string} fileName
 * @param {Buffer} buffer
 * @returns {Promise<string>} - returns path to saved file
 */
const saveImageBuffer = async (path, fileName, buffer) => {
  const pathToFile = `${path}${fileName}`;
  await sharp(buffer).toFile(pathToFile);
  return pathToFile;
};

module.exports = {
  compressImageBuffer,
  compressFileImage,
  generateNameForFile,
  deleteFileIfExists,
  saveImageBuffer,
};
