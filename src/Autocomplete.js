import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import Select from "react-select";
import "./Autocomplete.css";
import { symptoms } from "./symptoms";

const SymptomAutocomplete = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [diseases, setDiseases] = useState([]);

  const fetchData = () => {
    fetch("https://health-app-backend-prachir.herokuapp.com/themodel/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ symptoms: selectedSymptoms }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setIsLoading(false);
        setDiseases(data.diseases);
      })
      .catch((error) => {
        setIsLoading(false);
        setIsError(true);
        console.log(error);
      });
  };

  const onChange = (event) => {
    setSelectedSymptoms(event.map((val) => val.value));
  };

  const onButtonClick = (event) => {
    console.log(selectedSymptoms);
    setIsLoading(true);
    setIsError(false);
    fetchData();
  };

  return (
    <div>
      <Select
        isMulti
        name="colors"
        options={symptoms}
        className="basic-multi-select"
        classNamePrefix="select"
        onChange={onChange}
      />
      <div className="new-class">
        <Button variant="contained" size="large" onClick={onButtonClick}>
          Predict Disease
        </Button>
      </div>
      {isLoading ? (
        <div className="loader">
          <LinearProgress />
        </div>
      ) : null}

      {isError ? (
        <div className="error">
          <Alert severity="error">
            <AlertTitle>
              Unknown Error Occured while fetching results
            </AlertTitle>
          </Alert>
        </div>
      ) : null}
      <div className="disease-box">
        <Grid container spacing={5} justifyContent="center">
          {diseases.map((disease) => {
            return (
              <Grid item>
                <Card sx={{ minWidth: 275 }}>
                  <CardContent>
                    <Typography variant="h6" component="div">
                      {disease[0]}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="large">{disease[1]}% possibility</Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </div>
    </div>
  );
};

export default SymptomAutocomplete;
