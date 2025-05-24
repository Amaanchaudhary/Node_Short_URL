import { URL } from "../models/url.js";

export const basicSSR = async (req, res) => {
  const allUrls = await URL.find({});

  return res.end(`
    <html>
    <head>
    </head>
    <body>
    <ol>
    ${allUrls
      .map(
        (url) =>
          `<li>${url.shortId} -> ${url.redirectURL} - ${url.visitHistory?.length} </li>`
      )
      .join(" ")}
    </ol>
    </body>
    </html>
    `);
};

export const ejsSSR = async (req, res) => {
  const allUrls = await URL.find({});

  return res.render("test", {
    urls: allUrls,  //can pass variables also 
  });
};
