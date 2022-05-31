import React from 'react'
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import NavBar from './NavBar'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import AddBoxIcon from '@mui/icons-material/AddBox';
import BgImage from './images/bg-img.jpg'
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
const Alert = React.forwardRef(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <span color="inherit" >
        Employee App
      </span>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const theme = createTheme();

const Home = () => {
  let navigate = useNavigate();
  const [userDetails, setUserDetails] = useState()
  const [personalDetails, setPersonalDetails] = useState({
    firstName: "",
    lastName: "",
    eid: "",
    nic: ""
  })
  const [birthday, setBirthday] = useState(new Date());
  const [address, setAddress] = useState([{ "address": '' }]);
  const [mobile, setMobile] = useState([{ "mobile": '' }]);
  const [departmentDetails, setDepartmentDetails] = useState(["Select"]);
  const [department, setDepartment] = useState("");
  const [designationDetails, setDesignationDetails] = useState([]);
  const [designation, setDesignation] = useState("");
  const [error, setError] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const handleChangeInput = e => {
    const { name, value } = e.target;
    setPersonalDetails({ ...personalDetails, [name]: value });
  };

  const handleAddressChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...address];
    list[index][name] = value;
    setAddress(list);
  };

  const handleMobileChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...mobile];
    list[index][name] = value;
    setMobile(list);
  };

  const handleChange = async (event) => {
    setDepartment(event.target.value);
    let dept = event.target.value;
    const result = await axios.get(`http://localhost:5000/departments/${dept}`)
    setDesignationDetails(result.data)

  };
  const handleChangeDes = async (event) => {
    setDesignation(event.target.value);
  };
  const handleAddAddress = () => {
    setAddress([...address, { "address": "" }]);
  };
  const handleRemoveAddress = (index) => {
    const list = [...address];
    list.splice(index, 1);
    setAddress(list);
  };

  const handleAddMobile = () => {
    setMobile([...mobile, { "mobile": "" }]);
  };
  const handleRemoveMobile = (index) => {
    const list = [...mobile];
    list.splice(index, 1);
    setMobile(list);
  };

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    setUserDetails(user)
    if (!user) {
      navigate('/login')
    }
  }, []);

  useEffect(() => {
    getDepartments()
    async function getDepartments() {
      const result = await axios.get(`http://localhost:5000/departments/`)
      setDepartmentDetails(result.data)
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (data.get('firstName') && data.get('lastName') && data.get('eid') && birthday && data.get('nic') && address && mobile && designation && department) {
      let body = {
        firstName: personalDetails.firstName,
        lastName: personalDetails.lastName,
        employeeId: personalDetails.eid,
        birthday: birthday,
        nic: personalDetails.nic,
        address: address,
        mobile: mobile,
        designation: designation,
        department: department
      }
      try {
        const result = await axios.post(`http://localhost:5000/employee/create`, body)
        setPersonalDetails({
          firstName: "",
          lastName: "",
          eid: "",
          nic: ""
        })
        setBirthday(new Date())
        setAddress([{ "address": '' }])
        setMobile([{ "mobile": '' }])
        setDesignation("")
        setDepartment("")
        handleClick();
      } catch (error) {
        console.log(error)
      }
    } else {
      setErrorMsg("Please Fill all fields")
      handleError()
    }
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleError = () => {
    setError(true);
  };

  const handleCloseError = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setError(false);
  };

  return (
    <>
      <NavBar user={userDetails} />
      <div style={{
        backgroundImage: `url(${BgImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        <ThemeProvider theme={theme} >
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
              Employee Added Successfully!
            </Alert>
          </Snackbar>
          <Snackbar open={error} autoHideDuration={6000} onClose={handleCloseError}>
            <Alert onClose={handleCloseError} severity="error">{errorMsg}</Alert>
          </Snackbar>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                paddingTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'blue' }}>
                <AddReactionIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Add New Employee
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      value={personalDetails.firstName}
                      onChange={handleChangeInput}
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      value={personalDetails.lastName}
                      onChange={handleChangeInput}
                      autoComplete="family-name"
                    />
                  </Grid>
                  <Grid item xs={12} >
                    <TextField
                      required
                      fullWidth
                      id="eid"
                      label="EmployeeID"
                      name="eid"
                      autoComplete="eid"
                      value={personalDetails.eid}
                      onChange={handleChangeInput}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="nic"
                      label="NIC"
                      name="nic"
                      autoComplete="nic"
                      value={personalDetails.nic}
                      onChange={handleChangeInput}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        required
                        label="Date of Birth"
                        value={birthday}
                        onChange={(newValue) => {
                          setBirthday(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </Grid>
                  {address.map((singleAddress, i) => (
                    <Grid key={i} style={{ display: 'flex' }} item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="address"
                        label="Address"
                        name="address"
                        autoComplete="address"
                        value={singleAddress.address}
                        onChange={(e) => handleAddressChange(e, i)}
                      />
                      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClick={() => { handleRemoveAddress(i) }}><RemoveCircleIcon /></div>
                      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClick={() => { handleAddAddress() }}><AddBoxIcon /></div>
                    </Grid>
                  ))}
                  {mobile.map((singleMobile, i) => (
                    <Grid key={i} style={{ display: 'flex' }} item xs={12}>
                      <TextField
                        required
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                        fullWidth
                        id="mobile"
                        label="Mobile Number"
                        name="mobile"
                        value={singleMobile.mobile}
                        onChange={(e) => handleMobileChange(e, i)}
                      />
                      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClick={() => { handleRemoveMobile(i) }}><RemoveCircleIcon /></div>

                      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClick={() => { handleAddMobile() }}><AddBoxIcon /></div>
                    </Grid>
                  ))}
                  <Grid item xs={12} >

                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Department</InputLabel>
                      <Select
                        required
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={department}
                        label="Department"
                        onChange={handleChange}
                      >
                        {departmentDetails && departmentDetails.map((dept, i) => (
                          <MenuItem key={i} value={dept.department}>{dept.department}</MenuItem>
                        ))}
                      </Select>

                    </FormControl>
                  </Grid>
                  {designationDetails.length !== 0 &&
                    <Grid item xs={12} >
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Designation</InputLabel>
                        <Select
                          required
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={designation}
                          label="Designation"
                          onChange={handleChangeDes}
                        >
                          {designationDetails && designationDetails.map((des, i) => (
                            <MenuItem key={i} value={des}>{des}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>}
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Submit
                </Button>
              </Box>
            </Box>
            <Copyright sx={{ mt: 5 }} />
          </Container>
        </ThemeProvider>
      </div>
    </>
  )
}

export default Home