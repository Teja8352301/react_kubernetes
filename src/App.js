import logo from './logo.svg';
import './App.css';
import { TextField } from './components/text-field';
import { Button } from './components/button';
import { TableHead } from './components/table-head';
import { TableRow } from './components/table-row';
import { TableCell } from './components/table-cell';
import React,{useState,useEffect} from 'react';
import axios from 'axios';

function App() {
  const [fieldData,setFieldData]=useState({
    name:'',
    age:0,
    email:''
  })

  console.log("ENV--")
  console.log(process.env.NODE_APP_URL_DEV)

  const [usersData,setUsersData] = useState([])

  const changeFieldValue=(event)=>{
    const fieldName = event.target.name
    const value = event.target.value;
    setFieldData({...fieldData,[fieldName]:value})
  }

  const onSubmitHandler=()=>{
    axios.post('/user', fieldData)
    .then(function (response) {
      console.log(response);
      setFieldData({
        name:'',
        age:0,
        email:''
      })
    })
  }

  return (
    <div className="col-12">
      <div className='col-12 col-md-6'>
        <TextField name={"name"} type={"text"} change={changeFieldValue} label="Full Name" id={"fullName"}/>
        <TextField name={"email"} type={"text"} change={changeFieldValue} label="Email" id={"email"}/>
        <TextField name={"age"} type={"number"} change={changeFieldValue} label="Full Name" id={"fullName"}/>
        <Button>Submit</Button>
      </div>
    </div>
  );
}

export default App;
