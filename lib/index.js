const { requireResume } = require('./resume');
const { renderThemedHTML, getThemePackage } = require('./theme')
const { outputHTML } = require('./output/html');
const { outputPDF } = require('./output/pdf');

async function exportResume(resumePath, outputPath, format, theme) {
  const resumeJSON = await requireResume(resumePath);
  const resumeHTML = await renderThemedHTML(resumeJSON, theme);

  switch (format) {
    case "html":
      await outputHTML(resumeHTML, outputPath);
      break;
    case "pdf":
      const themePkg = getThemePackage(theme);
      await outputPDF(resumeHTML, themePkg.pdfRenderOptions, outputPath);
      break;
    default:
      throw Error(`Output for "${format}" is not implemented.`);
  }
}

module.exports = { exportResume };