const fs = require('fs').promises;

const readData = async (filePath) => {
  try {
    const fileData = await fs.readFile(filePath, 'utf8');
    return fileData.trim() ? JSON.parse(fileData) : [];
  } catch (err) {
    if (err.code === 'ENOENT') {
      return [];
    }
    throw err;
  }
};

const writeData = async (filePath, data) => {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
};

module.exports = {
  readData,
  writeData
};
