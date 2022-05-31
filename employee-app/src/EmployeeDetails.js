import React, { useState, useEffect } from 'react'
import NavBar from './NavBar';
import { useNavigate } from "react-router-dom";

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import EditEmployeeDetails from './EditEmployeeDetails';
import BgImage from './images/bg-img.jpg'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

// const Transition = React.forwardRef(function Transition(
//     props: TransitionProps & {
//         children: React.ReactElement;
//     },
//     ref: React.Ref,
// ) {
//     return <Slide direction="up" ref={ref} {...props} />;
// });

const Alert = React.forwardRef(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const EmployeeDetails = () => {

    const [userDetails, setUserDetails] = useState()
    const [toggle, setToggle] = useState(false)
    const [employeeDetails, setEmployeeDetails] = useState()
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [open, setOpen] = useState(false);
    let navigate = useNavigate();

    const handleClick = () => {
        setOpenSnackbar(true);
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnackbar(false);
    };

    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem('user'));
        setUserDetails(user)
        if (!user) {
            navigate('/login')
        }
    }, []);

    useEffect(() => {
        getEmployeeDetails()
        async function getEmployeeDetails() {
            try {
                const result = await axios.get(`http://localhost:5000/employee/`)
                setEmployeeDetails(result.data)
            } catch (error) {

                console.log(error)
            }
        }
    }, [toggle]);

    const handleDelete = async (id) => {
        try {
            const result = await axios.delete(`http://localhost:5000/employee/delete/${id}`)
            handleClick()
            handleClose()
            setToggle(!toggle)
        } catch (error) {
            console.log(error)
        }
    }


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
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
                <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                    <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                        Employee Deleted Successfully!
                    </Alert>
                </Snackbar>
                <Box
                    sx={{
                        paddingTop: 8,
                        paddingBottom: 6,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    {employeeDetails && employeeDetails.map((emp, i) => (

                        <Card key={i} sx={{ minWidth: 700, maxWidth: 700, marginBottom: 5 }} >
                            <CardContent>
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}>
                                    <Typography tyle={{ position: "absolute" }} gutterBottom variant="h6" component="div">
                                        <span style={{ fontWeight: 'bold' }}>{emp.firstName + " " + emp.lastName}</span>
                                    </Typography>
                                    <Typography variant="overline" color="text.secondary" style={{ position: "relative" }}>
                                        Employee ID : {emp.employeeId}
                                    </Typography>
                                </Box>
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'space-evenly',
                                }}>
                                    <Typography variant="body1" >
                                        <span style={{ fontWeight: 'bold' }}>NIC</span> : {emp.nic}
                                    </Typography>
                                    <Typography variant="body1" >
                                        <span style={{ fontWeight: 'bold' }}>Birthday</span> : {(new Date(emp.birthday)).getDate() + '/' + ((new Date(emp.birthday)).getMonth() + 1) + '/' + (new Date(emp.birthday)).getFullYear()}
                                    </Typography>
                                </Box>
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'space-evenly',
                                }}>
                                    <Typography variant="body1" >
                                        <span style={{ fontWeight: 'bold' }}>Department</span> : {emp.department}
                                    </Typography>
                                    <Typography variant="body1" >
                                        <span style={{ fontWeight: 'bold' }}>Designation</span> : {emp.designation}
                                    </Typography>
                                </Box>
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                }}>
                                    <Typography variant="body1" >
                                        <span style={{ fontWeight: 'bold' }}>Mobile</span> :
                                        {emp.mobile.map((mob, i) => (
                                            <span key={i} variant="body1" >
                                                {mob.mobile + '  '}
                                            </span>

                                        ))}
                                    </Typography>

                                </Box>
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                }}>
                                    <Typography variant="body1" >
                                        <span style={{ fontWeight: 'bold' }}>Address</span> :
                                        {emp.address.map((addr, i) => (
                                            <span key={i} variant="body1" color="text.secondary">

                                                {addr.address + '  '}
                                            </span>

                                        ))}
                                    </Typography>

                                </Box>
                            </CardContent>
                            <CardActions sx={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                            }}>
                                <EditEmployeeDetails toggle={toggle} setToggle={setToggle} id={emp._id} />
                                <Button onClick={handleClickOpen} color="error" size="small">Delete</Button>
                                <div>
                                    <Dialog
                                        open={open}
                                        keepMounted
                                        onClose={handleClose}
                                        aria-describedby="alert-dialog-slide-description"
                                    >
                                        <DialogTitle>{"Confirm to Delete"}</DialogTitle>
                                        <DialogContent>
                                            <DialogContentText id="alert-dialog-slide-description">
                                                Are you sure to Delete this?
                                            </DialogContentText>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button color="success" onClick={handleClose}>No</Button>
                                            <Button color="error" onClick={() => handleDelete(emp._id)}>Yes</Button>
                                        </DialogActions>
                                    </Dialog>
                                </div>
                            </CardActions>
                        </Card>
                    ))}
                </Box>
            </div>
        </>
    )
}

export default EmployeeDetails