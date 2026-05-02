var express = require("express");
var dataStore = require("../store/dataStore");

var router = express.Router();

function parseOptionalNumber(value) {
  if (value === undefined || value === null || value === "") {
    return null;
  }

  return Number(value);
}

function validateContentPayload(body) {
  if (!body.name || !String(body.name).trim()) {
    return "name is required";
  }

  if (body.type !== "image" && body.type !== "video") {
    return "type must be image or video";
  }

  if (!body.url || !String(body.url).trim()) {
    return "url is required";
  }

  return null;
}

function validateArchivePayload(body) {
  var index;
  if (!body || !Array.isArray(body.ids) || !body.ids.length) {
    return "ids must be a non-empty array";
  }

  for (index = 0; index < body.ids.length; index += 1) {
    if (isNaN(Number(body.ids[index]))) {
      return "all ids must be numeric";
    }
  }

  return null;
}

router.get("/mock-data", function (req, res) {
  return res.json(dataStore.getAllData());
});

router.get("/contents", function (req, res) {
  var filters = {
    type: req.query.type,
    category_id: req.query.category_id,
    folder_id: req.query.folder_id,
    search: req.query.search
  };
  var items = dataStore.getContents(filters);

  return res.json({
    total: items.length,
    items: items
  });
});

router.post("/contents", function (req, res) {
  var validationError = validateContentPayload(req.body);

  if (validationError) {
    return res.status(400).json({ message: validationError });
  }

  var content = dataStore.addContent({
    name: String(req.body.name).trim(),
    type: req.body.type,
    url: String(req.body.url).trim(),
    category_id: parseOptionalNumber(req.body.category_id),
    folder_id: parseOptionalNumber(req.body.folder_id),
    has_audio: req.body.has_audio
  });

  return res.status(201).json(content);
});

router.patch("/contents/archive", function (req, res) {
  var validationError = validateArchivePayload(req.body);
  var result;

  if (validationError) {
    return res.status(400).json({ message: validationError });
  }

  result = dataStore.archiveContents(req.body.ids);
  return res.json(result);
});

router.delete("/contents/:id", function (req, res) {
  var removed = dataStore.deleteContent(req.params.id);

  if (!removed) {
    return res.status(404).json({ message: "Content not found" });
  }

  return res.status(204).send();
});

module.exports = router;
