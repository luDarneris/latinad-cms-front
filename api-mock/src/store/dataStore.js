var fs = require("fs");
var path = require("path");
var mockData = require("../data/mockData");

function cloneData(data) {
  return JSON.parse(JSON.stringify(data));
}

var dbFilePath = path.join(__dirname, "..", "data", "db.json");
var db = loadOrInitializeDb();

function ensureDirectoryExists(filePath) {
  var directoryPath = path.dirname(filePath);
  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath, { recursive: true });
  }
}

function saveDbToDisk() {
  ensureDirectoryExists(dbFilePath);
  fs.writeFileSync(dbFilePath, JSON.stringify(db, null, 2), "utf8");
}

function loadOrInitializeDb() {
  var fileContent;

  if (!fs.existsSync(dbFilePath)) {
    db = cloneData(mockData);
    saveDbToDisk();
    return db;
  }

  fileContent = fs.readFileSync(dbFilePath, "utf8");

  if (!fileContent || !String(fileContent).trim()) {
    db = cloneData(mockData);
    saveDbToDisk();
    return db;
  }

  return JSON.parse(fileContent);
}

function getNextContentId() {
  var max = 0;
  var index;

  for (index = 0; index < db.contents.length; index += 1) {
    if (db.contents[index].id > max) {
      max = db.contents[index].id;
    }
  }

  return max + 1;
}

function applyContentFilters(contents, filters) {
  var filtered = contents.slice();

  if (filters.type) {
    if (filters.type === "archived") {
      filtered = filtered.filter(function (item) {
        return item.archived === true;
      });
    } else {
      filtered = filtered.filter(function (item) {
        return item.type === filters.type;
      });
    }
  }

  if (filters.category_id) {
    filtered = filtered.filter(function (item) {
      return String(item.category_id) === String(filters.category_id);
    });
  }

  if (filters.folder_id) {
    filtered = filtered.filter(function (item) {
      return String(item.folder_id) === String(filters.folder_id);
    });
  }

  if (filters.search) {
    var normalizedSearch = String(filters.search).toLowerCase();
    filtered = filtered.filter(function (item) {
      return item.name.toLowerCase().indexOf(normalizedSearch) !== -1;
    });
  }

  return filtered;
}

function getAllData() {
  return cloneData(db);
}

function getContents(filters) {
  return applyContentFilters(db.contents, filters || {});
}

function addContent(payload) {
  var newContent = {
    id: getNextContentId(),
    name: payload.name,
    type: payload.type,
    url: payload.url,
    category_id: payload.category_id || null,
    folder_id: payload.folder_id || null,
    created_at: payload.created_at || new Date().toISOString().slice(0, 10),
    archived: false,
    has_audio: payload.type === "video" ? Boolean(payload.has_audio) : false
  };

  db.contents.unshift(newContent);
  saveDbToDisk();
  return newContent;
}

function deleteContent(id) {
  var index = -1;
  var i;

  for (i = 0; i < db.contents.length; i += 1) {
    if (String(db.contents[i].id) === String(id)) {
      index = i;
      break;
    }
  }

  if (index === -1) {
    return false;
  }

  db.contents.splice(index, 1);
  saveDbToDisk();
  return true;
}

function archiveContents(ids) {
  var idMap = {};
  var archivedCount = 0;
  var index;
  var id;

  if (!ids || !ids.length) {
    return {
      archived_count: 0,
      archived_ids: []
    };
  }

  for (index = 0; index < ids.length; index += 1) {
    idMap[String(ids[index])] = true;
  }

  for (index = 0; index < db.contents.length; index += 1) {
    id = String(db.contents[index].id);
    if (idMap[id] && db.contents[index].archived !== true) {
      db.contents[index].archived = true;
      archivedCount += 1;
    }
  }

  if (archivedCount > 0) {
    saveDbToDisk();
  }

  return {
    archived_count: archivedCount,
    archived_ids: ids
  };
}

module.exports = {
  getAllData: getAllData,
  getContents: getContents,
  addContent: addContent,
  deleteContent: deleteContent,
  archiveContents: archiveContents
};
