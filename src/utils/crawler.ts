const axios = require("axios");
const cheerio = require("cheerio");
const { convert } = require("html-to-text");

export async function webCrawl(url: string, limit: number) {
  const crawledURLs = await crawl(url, limit);
  const textContents = await extractTextContent(crawledURLs);
  return textContents;
}

async function crawl(url: string, limit: number): Promise<any[]> {
  const visitedURLs = new Set();
  const queue = [url];
  const crawledURLs = [];

  while (queue.length > 0 && crawledURLs.length < limit) {
    const currentURL = queue.shift();

    if (!visitedURLs.has(currentURL)) {
      visitedURLs.add(currentURL);
      const pageHTML = await fetchPageHTML(currentURL);
      if (pageHTML) {
        crawledURLs.push(currentURL);
        const relativeURLs = extractRelativeURLs(pageHTML, currentURL);
        queue.push(...relativeURLs);
      }
    }
  }

  return crawledURLs;
}

async function extractTextContent(urls: string[]) {
  let textContents = {
    textContent: "",
  };

  for (const url of urls) {
    const pageHTML = await fetchPageHTML(url);
    if (pageHTML) {
      const options = {
        preserveNewlines: true,
        // ...
      };

      const textContent = await convert(pageHTML, options);
      textContents = { textContent: textContents.textContent + textContent };
    }
  }

  return textContents;
}

async function fetchPageHTML(url: string | undefined) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error: any) {
    console.error(`Error fetching page ${url}: ${error.message}`);
    return null;
  }
}

function extractRelativeURLs(html: any, baseURL: any) {
  const $ = cheerio.load(html);
  const relativeURLs: string[] = [];

  $("a").each((index: number, element: string) => {
    const href = $(element).attr("href");
    if (href && href.startsWith("/")) {
      const absoluteURL = new URL(href, baseURL).toString();
      relativeURLs.push(absoluteURL);
    }
  });

  return relativeURLs;
}
