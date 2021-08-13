const urls = require("../data/urls-data");
const uses = require("../data/uses-data");

/******************************* Middleware *******************************/
// Validates that the data within the body of the request has an href property.
function bodyHasHref(req, res, next) {
  // grab the href from the request body
  const { data: { href } = {} } = req.body;
  // if href exists, set it to a local variable and proceed to next middleware
  if (href) {
    res.locals.href = href;
    return next();
  }
  // otherwise throw a 400 error
  next({ status: 400, message: "An 'href' property is required." });
}

// Validates that the urlId param exists
function urlExists(req, res, next) {
  // grab the urlId from the path params
  const urlId = Number(req.params.urlId);
  // find a matching url obj in the urls global array
  const foundUrl = urls.find((url) => url.id === urlId);

  // if such a url exists, set it to a local variable and proceed to the next middleware
  if (foundUrl) {
    res.locals.foundUrl = foundUrl;
    return next();
  }

  // otherwise throw a 404 error
  next({
    status: 404,
    message: `Url id not found: ${req.params.urlId}`,
  });
}

// This happens as a side effect of reading the url
function createUseObj(req, res, next) {
  // Create a new use object each time a url is accessed
  uses.push({
    id: uses.length + 1,
    urlId: res.locals.foundUrl.id,
    time: Date.now(),
  });
  next();
}

/******************************* L-CRUD *******************************/

function list(req, res) {
  res.json({ data: urls });
}

function create(req, res) {
  // create a new url obj with unique id and the href from the body
  const newUrl = {
    id: urls.length + 1,
    href: res.locals.href,
  };
  // push the new url obj into the global urls array and return the obj as JSON
  urls.push(newUrl);
  res.status(201).json({ data: newUrl });
}

function read(req, res) {
  // return the found url object as JSON
  res.json({ data: res.locals.foundUrl });
}

function update(req, res) {
  // Set found url's href equal to the href from the body
  res.locals.foundUrl.href = res.locals.href;
  // return the found url object as JSON
  res.json({ data: res.locals.foundUrl });
}

module.exports = {
  create: [bodyHasHref, create],
  list,
  read: [urlExists, createUseObj, read],
  update: [urlExists, bodyHasHref, update],
  urlExists: urlExists,
};
