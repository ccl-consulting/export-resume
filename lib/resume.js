const fs = require('fs')
const { validate } = require('resume-schema');

function validateResume (resumeData) {
  return new Promise((resolve, reject) => {
    validate(resumeData, (result) => {
      if (result.valid) {
        resolve(resumeData);
      } else {
        // TODO: Handle warnings
        reject(result.errors);
      }
    });
  });
}

async function getResume (path) {
  let fileData;
  let resumeData;

  try {
    fileData = await new Promise(function (resolve, reject) {
      fs.readFile(path, function (err, data) {
        if (err) reject(err);
        else resolve(data);
      });
    });
  } catch (error) {
    throw Error('Unable to read file: ' + path);
  }

  try {
    resumeData = JSON.parse(fileData);
  } catch (error) {
    throw Error('Unable to parse file: ' + error);
  }

  return resumeData;
}

async function requireResume (path) {
  const resumeData = await getResume(path)
  const valid = await validateResume(resumeData)
  return resumeData;
}

module.exports = {
  validateResume,
  getResume,
  requireResume,
};