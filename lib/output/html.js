const fs = require('fs');

async function outputHTML(resumeHTML, outputPath) {
    return new Promise(function(resolve, reject) {
        fs.writeFile(outputPath, resumeHTML, function (err) {
            if (err) reject(err);
            else resolve(resumeHTML);
        });
    });
}

module.exports = { outputHTML };