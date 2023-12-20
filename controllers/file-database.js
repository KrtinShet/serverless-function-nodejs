const fs = require('fs');
const path = require('path');

// Paths for the function files and index
const functionPath = path.join(__dirname, '..', 'functions');

// Ensure the functions directory exists
const ensureFunctionDirectory = () => {
  if (!fs.existsSync(functionPath)) {
    fs.mkdirSync(functionPath, { recursive: true });
  }
};

exports.saveFunctionToFile = (fileName, code) => {
  ensureFunctionDirectory();
  fileName = functionPath + "/" + fileName;
  fs.writeFileSync(fileName, code)
}

exports.deleteFunctionFromFile = (fileName) => {
  fileName = functionPath + "/" + fileName;
  if (fs.existsSync(fileName)) {
    fs.unlinkSync(fileName)
  }
}

exports.updateFunctionToFile = (fileName, code) => {
  this.deleteFunctionFromFile(fileName);
  this.saveFunctionToFile(fileName, code);
}
