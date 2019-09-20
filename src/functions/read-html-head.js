// @ts-check
const cheerio = require('cheerio');
const request = require('request');

/**
 * Parse IncomingMessage stream for HTML <head> contents
 * @param {request.Request} readable
 */
const readHTMLHead = readable =>
  new Promise((resolve, reject) => {
    if (!readable) {
      reject(new Error('Readable required'));
      return;
    }

    let html = '';

    readable
      .on('error', reject)
      .on('data', chunk => {
        html += chunk.toString();

        // console.log(html);

        // Look for the closing head tag
        if (chunk.toString().indexOf('</head>') !== -1) {
          readable.destroy();
        }
      })
      .on('end', () => {
        const headStartIdx = html.indexOf('<head');
        const headEndIdx = html.indexOf('</head>') + 7;

        resolve(html.substr(headStartIdx, headEndIdx - headStartIdx));
      })
      .on('close', () => {
        const headStartIdx = html.indexOf('<head');
        const headEndIdx = html.indexOf('</head>') + 7;

        resolve(html.substr(headStartIdx, headEndIdx - headStartIdx));
      });
  });

exports.handler = async (event, context, callback) => {
  const body = JSON.parse(event.body);
  const dom = await readHTMLHead(request.get(body.url));
  const $ = cheerio.load(dom);

  const link = {
    title: $('head title').text(),
  };

  console.log(link);

  return { statusCode: 200, body: JSON.stringify(link) };
};
