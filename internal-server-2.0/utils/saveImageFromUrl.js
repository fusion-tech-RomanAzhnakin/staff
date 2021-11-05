const fs = require('fs');
const path = require('path');
const axios = require('axios');

const saveImageFromUrl = async (url, fileName) => {
  try {
    const filePath = path.basename(fileName);
    const localFilePath = path.resolve(__dirname, './../public/uploads/', filePath);
    const stream = fs.createWriteStream(localFilePath);

    const response = await axios.get(url, {
      responseType: 'stream',
    });

    return new Promise((resolve, reject) => {
      let error = null;
      response.data.pipe(stream);

      stream.on('error', (err) => {
        error = err;
        stream.close();
        reject(err);
      });

      stream.on('close', () => {
        if (!error) {
          resolve();
        }
      });
    });
  } catch (e) {
    console.error('[Error with downloading and saving image]: ', e);
  }
};

const saveImagesFromUrl = (images) => {
  const promises = images.map((image) => saveImageFromUrl(image.url, image.name));

  return Promise.all(promises);
};

const rmSavedImage = (fileName) => {
  try {
    fs.unlinkSync(`${__dirname}/../public/uploads/${fileName}`);
  } catch (e) {
    console.error('[Error with removing image]: ', e.message);
  }
};

const rmSavedImages = (images) => {
  images.forEach((image) => {
    rmSavedImage(image.name);
  });
};

module.exports = {
  saveImageFromUrl,
  saveImagesFromUrl,
  rmSavedImage,
  rmSavedImages,
};
