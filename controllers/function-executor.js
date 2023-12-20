const fs = require('fs');
const path = require('path');
const serverlessModel = require('../models/serverless-function');
const vm = require('vm');

// Paths for the function files
const functionPath = path.join(__dirname, '..', 'functions');

exports.executeFunction = async (req, res) => {
  const { functionId } = req.params;
  const functionData = await serverlessModel.get(functionId);

  if (functionData.httpMethod !== req.method)
    return res.status(405).send({ error: "Method not allowed" });

  const funcPath = path.join(functionPath, `${functionId}.js`);

  if (fs.existsSync(funcPath)) {
    try {
      const functionCode = fs.readFileSync(funcPath, 'utf8');
      const script = new vm.Script(functionCode);
      const sandbox = { req, result: null };
      const context = new vm.createContext(sandbox);
      script.runInContext(context);

      // Assuming the function sets sandbox.result
      res.send(sandbox.result);
    } catch (err) {
      console.log(err);
      res.status(500).send({ error: "Error executing function" });
    }
  } else {
    res.status(404).send({ error: "Function not found" });
  }
};
