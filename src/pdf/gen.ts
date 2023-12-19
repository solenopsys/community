const puppeteer = require('puppeteer');

async function gen(filePath: string) {
    const browser = await puppeteer.launch();

    const page = await browser.newPage();

    await page.setContent('<h1>Hello, Puppeteer!</h1>');
    const readableStream = await page.createPDFStream({format: 'A4'});
    readableStream.on('data', async (chunk: any) => {
        Bun.file(filePath, chunk)
        await Bun.write(filePath, chunk);
    });
    await browser.close();

    console.log('Here\'s your PDF!');
}

gen("whitepaper.pdf");