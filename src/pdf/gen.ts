import puppeteer from "puppeteer";
import {marked} from "marked";
import * as buffer from "buffer";


async function gen(filePath: string) {
    const browser = await puppeteer.launch();

    const page = await browser.newPage();

    const html = await Bun.file("./index.html").text()

    // Read Markdown content from a file
    const markdownContent = await Bun.file("./README.md").text();




// Convert Markdown to HTML
    const htmlContent = await marked(markdownContent);


   const injectedHtml = html.replace("{{content}}", htmlContent)

  // console.log("INJECTED",injectedHtml)

    await page.setContent(injectedHtml);


    const readableStream = await page.createPDFStream({format: 'A4'});

    const chunks: Buffer[] = [];

  await   readableStream.forEach((chunk: Buffer) => {
        console.log('Got a chunk of data:', chunk.length);
      chunks.push(chunk);

    })
    await browser.close();

   const joinedBuffer= Buffer.concat(chunks);


    await Bun.write(filePath,joinedBuffer );

    console.log('Here\'s your PDF!');
}


gen("Solenopsys.pdf");