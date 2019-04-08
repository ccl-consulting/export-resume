const THEME_PACKAGE_PREFIX = 'jsonresume-theme-';

function getThemePackage(theme) {
  if (!theme.startsWith(THEME_PACKAGE_PREFIX)) {
    theme = THEME_PACKAGE_PREFIX + theme;
  }
  let themePkg;
  try {
    themePkg = require(theme);
  } catch (error) {
    // throw Error('Unable to import theme: ' + error);
    console.log('You have to install this theme relative to the folder to use it e.g. `npm install ' + theme + '`');
    process.exit();
  }
  return themePkg;
}

async function renderThemedHTML(resumeData, theme) {
  const themePkg = getThemePackage(theme);
  return themePkg.render(resumeData);
};

module.exports = {
  getThemePackage,
  renderThemedHTML
};
