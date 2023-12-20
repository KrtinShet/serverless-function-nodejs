import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate, useParams } from 'react-router-dom';
import MonacoEditor, { ChangeHandler } from 'react-monaco-editor';
import { Container, TextField, Button, Typography, MenuItem, Box } from '@mui/material';
import { deleteSeverlessFunction, updateSeverlessFunction, useGetServerlessFunctions } from '../api/serverless-function';

const EditFunctionEditor = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>()
  const { enqueueSnackbar } = useSnackbar();

  const [route, setRoute] = useState('');
  const [httpMethod, setHttpMethod] = useState('');
  const [functionName, setFunctionName] = useState('');
  const [functionCode, setFunctionCode] = useState('');

  const { data } = useGetServerlessFunctions(`${id}`);

  useEffect(() => {
    if (data) { 
      setRoute(data.route);
      setHttpMethod(data.httpMethod);
      setFunctionName(data.functionName);
      setFunctionCode(data.functionCode);
    }
  }, [data])



  const httpMethods = ['GET', 'POST', 'PUT', 'DELETE'];


  const handleUpdate = async () => {
    const response = await updateSeverlessFunction({
      functionCode,
      functionId: id,
      functionName,
      httpMethod,
      route
    })

    if (response?.errorMessage)
      enqueueSnackbar(response?.errorMessage, { variant: 'error' })
    else
      enqueueSnackbar(response?.successMessage, { variant: 'success' });

    navigate('/')
  };

  const handleDelte = async () => {
    const response = await deleteSeverlessFunction(`${id}`);

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
      <Box sx={{ display: 'flex', justifyContent: "space-between", alignItems: 'center' }}>

        <Typography variant="h4" gutterBottom>
          Serverless Function Editor
        </Typography>
        <Button variant='contained' color='error' onClick={handleDelte}>
          Delete Function
        </Button>
      </Box>

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
        label="Route"
        fullWidth
        disabled
        margin="normal"
        variant="outlined"
        value={route}
        onChange={(e) => setRoute(e.target.value)}
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
        ))}
      </TextField>
      <Button variant="contained" color="primary" onClick={handleUpdate}>
        Update Function
      </Button>
    </Container>
  );
};

export default EditFunctionEditor;