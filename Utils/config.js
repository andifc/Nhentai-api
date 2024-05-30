const headers = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
  "Cache-Control": "private",
  Referer: "https://www.google.com/search?q=nhentai",
  Connection: "keep-alive",
};

const base_uri = { home: "https://nhentai.to/index", comic:  "https://nhentai.to/g", search: "https://nhentai.to/search/?q="};

module.exports = { headers, base_uri };
