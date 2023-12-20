import { Link, useNavigate } from "react-router-dom";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import uuidv4 from "../utils/uuidv4";
import { useGetAllServerlessFunctions } from "../api/serverless-function";


const FunctionList = () => {

  const navigate = useNavigate();

  const { functions } = useGetAllServerlessFunctions()

  const handleNewClick = () => navigate(`/function/${uuidv4()}`)

  return (
    <>
      <Box>
        <Button variant="contained" onClick={handleNewClick}>
          Create New Function
        </Button>
      </Box>
      <Stack direction="column" spacing={2} mt={5}>
        {functions?.map(func => (
          <Paper elevation={3} sx={{ p: 2, borderRadius: 3, display: "flex", alignItems: "center", justifyContent: "space-between" }} >
            <Typography>{func.functionName}</Typography>
            <Button variant="contained" component={Link} to={`/function/edit/${func.functionId}`}>
              Edit
            </Button>
          </Paper>
        ))}
      </Stack>
    </>
  );
};

export default FunctionList;