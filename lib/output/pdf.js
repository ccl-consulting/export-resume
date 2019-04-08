const puppeteer = require('puppeteer');

// TODO: output to buffer
async function outputPDF(resumeHTML, pdfRenderOptions = {}, outputPath) {
    let browser = null;
    try {
        browser = await puppeteer.launch();

        let page = await browser.newPage();

        await page.emulateMedia(pdfRenderOptions.mediaType || 'screen');
        await page.setContent(resumeHTML, {
            waitUntil: 'networkidle0',
        });
        await page.pdf({
            path: outputPath,
            format: 'Letter',
            printBackground: true,
            ...pdfRenderOptions
        });
    } catch (error) {
        throw error;
    } finally {
        if (browser !== null) {
            await browser.close();
        }
    }
}

module.exports = {
    outputPDF
};