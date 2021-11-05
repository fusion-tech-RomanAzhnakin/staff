const getRandomRecord = (array) => {
  const randomId = Math.floor(Math.random() * array.length);
  return array[randomId];
};

module.exports = {
  getRandomRecord,
};
