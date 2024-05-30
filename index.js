const express = require("express");
const {
    getPopulars,
    getUploads,
    getComic,
    getImages,
    Search
  } = require("./Utils/Nhentai");

const app = express();

app.get("/", (req, res) => {
    res.json({message: "Nhentai api is runing!"});
});

app.get("/:main", (req, res) => {
    let main = String(req.params.main).toLowerCase();
    let code = String(req.query.c);
    let q = String(req.query.q);

    switch (main) {
        case "populars":
            getPopulars().then((r) => res.json(r))
            break;
        case "recents":
            getUploads().then((r) => res.json(r))
            break;
        case "comic":
            getComic(code).then((r) => res.json(r))
            break;
        case "images":
            getImages(code).then((r) => res.json(r))
            break;
        case "search":
            Search(q).then((r) => res.json(r))
            break;
        default:
            res.status(404).json({Error: "404 not found."})
            break;
    }
});

app.listen(3300 || process.env.PORT, () => {
    console.log("Nhentai api is runing!");
});