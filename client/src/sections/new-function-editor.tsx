import { useState } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate, useParams } from 'react-router-dom';
import MonacoEditor, { ChangeHandler } from 'react-monaco-editor';
import { Container, TextField, Button, Typography, MenuItem } from '@mui/material';
import { createServerlessFunction } from '../api/serverless-function';

const _defaultFunctionCode =
  `function handleRequest(req) {
    return 'Hello World!';
  }
  
  result = handleRequest(req);
`

const NewFunctionEditor = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>()
  const { enqueueSnackbar } = useSnackbar();

  const [httpMethod, setHttpMethod] = useState('');
  const [functionName, setFunctionName] = useState('');
  const [functionCode, setFunctionCode] = useState(_defaultFunctionCode);

  const httpMethods = ['GET', 'POST', 'PUT', 'DELETE'];

  const handleDeploy = async () => {
    const response =
      await createServerlessFunction({
        functionCode,
        functionId: id as string,
        functionName,
        httpMethod,
        route: id as string
      })

    if (response?.errorMessage)
      enqueueSnackbar(response?.errorMessage, { variant: 'error' })
    else
      enqueueSnackbar(response?.successMessage, { variant: 'success' });

    navigate('/')

  };

  const handleEditorChange: ChangeHandler = (newValue) => {
    setFunctionCode(newValue);
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Serverless Function Editor
      </Typography>
      <MonacoEditor
        height="400"
        language="javascript"
        theme="vs-dark"
        value={functionCode}
        options={{
          selectOnLineNumbers: true,
          roundedSelection: false,
          readOnly: false,
          cursorStyle: 'line',
          automaticLayout: true,
        }}
        onChange={handleEditorChange}
      />
      <TextField
        label="Function Name"
        fullWidth
        margin="normal"
        variant="outlined"
        value={functionName}
        onChange={(e) => setFunctionName(e.target.value)}
      />
      <TextField
        disabled
        label="Route"
        fullWidth
        margin="normal"
        variant="outlined"
        value={id}
      />
      <TextField
        select
        label="HTTP Method"
        fullWidth
        margin="normal"
        value={httpMethod}
        onChange={(e) => setHttpMethod(e.target.value)}
        variant="outlined"
      >
        {httpMethods.map((method) => (
          <MenuItem key={method} value={method}>
            {method}
          </MenuItem>
        ))}w
      </TextField>
      <Button variant="contained" color="primary" onClick={handleDeploy}>
        Deploy Function
      </Button>
    </Container>
  );
};

export default NewFunctionEditor;