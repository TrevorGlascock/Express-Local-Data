const uses = require("../data/uses-data");

/******************************* Middleware *******************************/
function filterUses(req, res, next) {
  const { urlId } = req.params;

  res.locals.uses = urlId
    ? uses.filter((currentUse) => currentUse.urlId === Number(urlId))
    : uses;

  next();
}

function useExists(req, res, next) {
  const { useId } = req.params;
  const foundUse = res.locals.uses.find(
    (currentUse) => currentUse.id === Number(useId)
  );

  if (!foundUse)
    return next({
      status: 404,
      message: `use id not found: ${useId}`,
    });

  res.locals.foundUse = foundUse;
  next();
}

/******************************* L-CRUD *******************************/
function list(req, res) {
  res.json({ data: res.locals.uses });
}

function read(req, res) {
  res.json({ data: res.locals.foundUse });
}

function destroy(req, res) {
  const index = uses.indexOf(res.locals.foundUse);
  uses.splice(index, 1);
  res.sendStatus(204);
}

module.exports = {
  list: [filterUses, list],
  read: [filterUses, useExists, read],
  delete: [filterUses, useExists, destroy],
};
