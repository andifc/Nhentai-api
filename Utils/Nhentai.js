const axios = require("axios").default;
const { load } = require("cheerio");
const { headers, base_uri } = require("./config");

axios.defaults.withCredentials = true;
axios.defaults.headers = headers;

/**
 * Funcion para obtener los comics mas populares de la pagina de Nhentai.
 * 
 * @return {Promise<object>} Comics populares.
 */
async function getPopulars() {
  try {
    const { data } = await axios.get(base_uri.home);
    const $ = load(data);
    const element = $(".index-container").eq(0);
    const result = [];

    $(`${element} > .gallery > a`)
      .children()
      .each((i, el) => {
        if ($(el) && i > 0) {
          result.push({
            name: $(el).find(".caption").text(),
            cover: $(el).find("img").attr("data-src") || $(el).find("img").attr("src"),
            id: parseInt(
              $(el).parent().find(".cover").attr("href").split("/")[2]
            ),
          });
        }
      });

    return result;
  } catch (error) {
    throw new Error(error);
  }
}

/**
 * Funcion para obtener los comics recientes de la pagina de Nhentai.
 * 
 * @return {Promise<object>} Comics recientes.
 */
async function getUploads() {
  try {
    const { data } = await axios.get(base_uri.home);
    const $ = load(data);
    const element = $(".index-container").eq(1);
    const result = [];

    $(`${element} > .gallery > a`)
      .children()
      .each((i, el) => {
        if ($(el) && i > 0) {
          result.push({
            name: $(el).find(".caption").text(),
            cover: $(el).find("img").attr("data-src") || $(el).find("img").attr("src"),
            id: parseInt(
              $(el).parent().find(".cover").attr("href").split("/")[2]
            ),
          });
        }
      });

    return result;
  } catch (error) {
    throw new Error(error);
  }
}

/**
 * Funcion para obtener la informacion detallada del comic.
 * 
 * @param {string} id Id del comic.
 * @return {Promise<object>} Informacion del comic.
 */
async function getComic(id) {
  try {
    const { data } = await axios.get(`${base_uri.comic}/${id}`);
    const $ = load(data);
    const element = $("#bigcontainer");
    const elm = (i) => {
      return $(`${element} > #info-block`)
        .find("#info > #tags")
        .find(".tag-container")
        .eq(i);
    };
    const result = {
      cover: $(`${element} > #cover`).find("a img").attr("src") || $(`${element} > #cover`).find("a img").attr("data-src"),
      name: $(`${element} > #info-block`).find("#info h1").text(),
      id: parseInt(
        $(`${element} > #info-block`)
          .find("#info > #gallery_id")
          .text()
          .replace("#", "")
      ),
      tags: elm(0)
        .find(".tags a")
        .map((i, el) => $(el).find(".name").text())
        .toArray(),
      author: elm(1).find(".tags a > .name").text(),
      languages: elm(2)
        .find(".tags a")
        .map((i, el) => $(el).find(".name").text())
        .toArray(),
      category: elm(3).find(".tags a").find(".name").text(),
      uploaded: elm(5).find(".tags time").text().split(" ")[0],
      pages: parseInt(elm(4).find(".tags a").find(".name").text()),
    };

    return result;
  } catch (error) {
    throw new Error(error);
  }
}

/**
 * Funcion para obtener todas las imagenes H del comic.
 * 
 * @param {string} id Id del comic.
 * @return {Promise<object>} Imagenes del comic.
 */
async function getImages(id) {
  try {
    const { data } = await axios.get(`${base_uri.comic}/${id}`);
    const $ = load(data);

      const images = $(".thumb-container a > img").map(function() {
        return $(this).attr("data-src").replace("t.",".") || $(this).attr("src").replace("t.",".")
      }).toArray()
    return images;
  } catch (error) {
    throw new Error(error);
  }
}

/**
 * Funcion para buscar un comic.
 * 
 * @param {string} q Query de la busqueda.
 * @returns {Promise<object>} Resultado de la busqueda.
 */
async function Search(q) {
    try {
      const { data } = await axios.get(`${base_uri.search}${q}`);
      const $ = load(data);
      const element = $(".index-container");

      const result = [];
  
      $(`${element} > .gallery > a`)
        .children()
        .each((i, el) => {
          if ($(el) && i > 0) {
            result.push({
              name: $(el).find(".caption").text(),
              cover: $(el).find("img").attr("data-src") || $(el).find("img").attr("src"),
              id: parseInt(
                $(el).parent().find(".cover").attr("href").split("/")[2]
              ),
            });
          }
        });
  
      return result;
    } catch (error) {
      throw new Error(error);
    }
}

module.exports = {
  getPopulars,
  getUploads,
  getComic,
  getImages,
  Search
};