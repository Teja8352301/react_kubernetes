import logo from "./logo.svg";
import "./App.css";
import { TextField } from "./components/text-field";
import { Button } from "./components/button";
import { TableHead } from "./components/table-head";
import { TableRow } from "./components/table-row";
import { TableCell } from "./components/table-cell";
import React, { useState, useEffect } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import axios from "axios";

function App() {
  const [fieldData, setFieldData] = useState({
    name: "",
    age: 0,
    email: "",
  });

  const [usersData, setUsersData] = useState([]);

  const [usersCall, setUsersCall] = useState(true);

  let nodeAppUrl;
  if (process.env.MODE === "production") {
    nodeAppUrl = process.env.NODE_APP_PROD;
  } else {
    nodeAppUrl = process.env.NODE_APP_DEV;
  }

  console.log("Node APP URL----------")
  console.log(nodeAppUrl)
  console.log("Node APP URL----------")

  useEffect(() => {
    if (usersCall) {
      axios.get(`${nodeAppUrl}/getAllUsers`).then((response) => {
        setUsersData(response.data);
        setUsersCall(false);
      });
    }
  }, [usersCall]);

  const changeFieldValue = (event) => {
    const fieldName = event.target.name;
    const value = event.target.value;
    setFieldData({ ...fieldData, [fieldName]: value });
  };

  const onSubmitHandler = () => {
    axios.post(`${nodeAppUrl}/addUser`, fieldData).then(function (response) {
      setUsersCall(true);
      setFieldData({
        name: "",
        age: 0,
        email: "",
      });
    });
  };

  return (
    <div className="col-12 m-3 d-flex justify-content-center">
      <div className="col-12 col-md-6">
        <div className="col-12 my-1">
          <TextField
            name={"name"}
            type={"text"}
            value={fieldData["name"]}
            change={changeFieldValue}
            label="Full Name"
            id={"fullName"}
          />
        </div>
        <div className="col-12 my-1">
          <TextField
            name={"email"}
            type={"text"}
            value={fieldData["email"]}
            change={changeFieldValue}
            label="Email"
            id={"email"}
          />
        </div>
        <div className="col-12 my-1">
          <TextField
            name={"age"}
            type={"number"}
            value={fieldData["age"]}
            change={changeFieldValue}
            label="Age"
            id={"age"}
          />
        </div>
        <div className="col-12 my-1">
          <Button clicking={onSubmitHandler}>Submit</Button>
        </div>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Age</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {usersData.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.age}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      </div>
    </div>
  );
}

export default App;
