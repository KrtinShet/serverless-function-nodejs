import { Container, Typography } from "@mui/material";
import Router from "./routes";


const App = () => {

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        SkyFunction: Serverless Function
      </Typography>
      <Router />
    </Container>
  );


};

export default App;
