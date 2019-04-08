const { exportResume } = require(__dirname + '/lib');

const resumePath = './resume.json';
const outputPath = './resume.pdf';
const format = 'pdf';
const theme = 'flat';

(async function () {
  await exportResume(
    resumePath,
    outputPath,
    format,
    theme,
  );
});
