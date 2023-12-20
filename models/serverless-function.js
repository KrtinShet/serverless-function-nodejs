const fs = require('fs');
const { FSDB } = require("file-system-db");
const path = require('path');
const db = new FSDB('./db.json', false);

exports.create = (data) => {
  return new Promise((resolve, reject) => {
    const d = db.get(data.functionId);
    if (d) reject('Data already exists')
    db.set(data.functionId, data)
    resolve(data)
  })
}

exports.getAll = () => {
  return new Promise((resolve, reject) => {
    const data = db.getAll().map((d) => d.value);
    resolve(data)
  })
}

exports.get = (functionId) => {
  return new Promise((resolve, reject) => {
    const data = db.get(functionId);
    if (!data) reject('Data not found')
    const codePath = path.resolve(__dirname, `../functions/${functionId}.js`);
    const code = fs.readFileSync(codePath, 'utf8');
    data.functionCode = code;
    resolve(data)
  })
}

exports.update = (functionId, data) => {
  return new Promise((resolve, reject) => {
    const d = db.get(functionId);
    if (!d) reject('Data not found')
    db.set(functionId, { ...d, ...data })
    resolve(data)
  })
}

exports.delete = (functionId) => {
  return new Promise((resolve, reject) => {
    const data = db.get(functionId);
    if (!data) reject('Data not found')
    db.delete(functionId)
    resolve(data)
  })
}

