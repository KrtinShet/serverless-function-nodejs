const serverlessFunctionModel = require('./../models/serverless-function');
const {
  saveFunctionToFile,
  updateFunctionToFile,
  deleteFunctionFromFile
} = require('./file-database')

exports.createServerlessFunction = async (req, res) => {
  const { functionId } = req.params;
  const { route, httpMethod, functionName, functionCode } = req.body;

  saveFunctionToFile(`${functionId}.js`, functionCode);
  await serverlessFunctionModel.create({
    route,
    httpMethod,
    functionName,
    functionId
  });

  res.send({ message: 'Function created', functionId });
};

exports.getAllServerlessFunction = async (req, res) => {
  const data = await serverlessFunctionModel.getAll();
  res.send(data);
};

exports.getServerlessFunction = async (req, res) => {
  const { functionId } = req.params;
  const data = await serverlessFunctionModel.get(functionId);

  if (!data) {
    return res.status(404).send({ message: 'Function not found' });
  }
  res.send(data);
};

exports.updateServerlessFunction = async (req, res) => {
  const { functionId } = req.params;
  const { functionCode, ...rest } = req.body;

  if (functionCode)
    updateFunctionToFile(`${functionId}.js`, functionCode);

  await serverlessFunctionModel.update(functionId, rest);

  res.send({ message: 'Function updated', functionId });
};

exports.deleteServerlessFunction = async (req, res) => {
  const { functionId } = req.params;
  deleteFunctionFromFile(`${functionId}.js`);
  await serverlessFunctionModel.delete(functionId);
  res.send({ message: 'Function deleted', functionId });
};