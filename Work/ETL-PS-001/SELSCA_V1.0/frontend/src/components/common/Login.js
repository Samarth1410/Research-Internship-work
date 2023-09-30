import React, { useState  } from "react";
import { Typography , Paper, Grid , Avatar, TextField , Button, Select, MenuItem  , Box} from "@mui/material";
import { Container } from "@mui/system";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Swal from 'sweetalert2';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./../../styles/styles.css";
import RCTSIcon from "../../misc/icons/RCTS - Logo - Transparent 1.png";


const Login = () => {
    const navigate = useNavigate();
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const [role , setRole] = useState("");

    const CheckInput = () => {
        
        if (role === "") {
            Swal.fire({
                icon : 'warning',
                text: 'Please select a Role'
            })
            return false
        }
        else if (email === "") {
            Swal.fire({
                icon: 'warning',
                text: 'Please enter email'
            })
            return false
        } 
        else if (password === "") {
            Swal.fire({
                icon : 'warning',
                text : 'Please enter password'
            })
        }
        else {
            return true
        }
    }

    //main login function which checks the credentials , sets the Json Web Token and role to the local storage
    //the local storage items are used elsewhere in the site once logged in , please be careful will changing the item names
    const handleSubmit = async (e) => {
        
        e.preventDefault();

        if (CheckInput()) {
            try {
                const loginResponse = await axios.post("http://localhost:5000/login" , {
                    role : role,
                    email : email,
                    password : password
                })
                localStorage.setItem("token" , loginResponse.data.token);
                localStorage.setItem("role" , role);
                console.log(loginResponse.data.token)
                try {
                    //checking the json web token and navigating to the right user page
                    const res = axios.get("http://localhost:5000/login/isUserAuth" , {
                        headers : {
                            "x-access-token" : localStorage.getItem("token"),
                            "role" : role,
                        }
                    })
                    if (role === 'admin') {
                        navigate('/admin')
                    }
                    else if (role === 'teacher') {
                        navigate('/teacher')
                    }
                    else if (role ==='student') {
                        navigate('/student')
                    }
                }
                catch (err) {
                    Swal.fire({
                        icon : 'error',
                        title : err.response.data.message
                    })
                }
            }
            catch (err) {
                Swal.fire({
                    icon : 'error',
                    title : err.response.data.message
                })
            }
        }
    }

    return(
        <div>
        <Container>
          <Grid container justifyContent="center" alignItems="center" spacing={3}>
            <Grid item xs={6} align="center">
                <Box style={{padding: 100}}>
              <img src={RCTSIcon} style={{ width: "150%"}} alt="RCTS Icon" />
                </Box>
            </Grid>
            <Grid item xs={6} align="center">
            <Container sx={{paddingTop : "100px" , paddingLeft : "100px"}} >
              <Paper variant="login1" >
                <Container align="center">
                        <Avatar sx={{ width: 56, height: 56 }}><AccountCircleIcon /></Avatar>
                        <Typography className="loginTypography" variant="overline" sx={{fontSize:24}}>Sign in</Typography>
                        <Grid item  xs={6} >
                            <Typography className="loginTypography" variant="overline" >Role :</Typography>
                        </Grid>
                            <Grid item xs={6} padding={3}>
                                <Select  value={role} label="Role" text="secondary"
                                // className="inputRounded"
                                onChange={(e) => {setRole(e.target.value)}}>
                                    <MenuItem value="admin">Admin</MenuItem>
                                    <MenuItem value="teacher">Teacher</MenuItem>
                                    <MenuItem value="student">Student</MenuItem>
                                </Select>
                            </Grid>
                            <Grid item xs={12} padding={3}>
                                <TextField label='Email' placeholder="Enter Email"
                                className="inputRounded" onChange={(e) => {setEmail(e.target.value)}}></TextField>
                            </Grid>
                            <Grid item xs={12} padding ={3}>
                                <TextField type='password' label='Password' placeholder="Enter Password" 
                                className="inputRounded" onChange={(e) => {setPassword(e.target.value)}}></TextField>
                            </Grid>
                            <Grid item xs={12} padding ={3}>
                                <Button variant='contained' onClick={handleSubmit}>Login</Button>
                            </Grid>
                </Container>
              </Paper>
            </Container>
            </Grid>
          </Grid>
        </Container>
      </div>
    )
}

export default Login;