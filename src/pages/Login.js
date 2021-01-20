import { Avatar, Button, FilledInput, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Paper, TextField, Typography, withStyles } from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import React, { useState, useEffect } from 'react'
import clsx from 'clsx';
import Controls from "../components/controls/Controls";
import { useForm, Form } from "../components/useForm";
import { ACTION_TYPES } from '../actions/order';
import * as actions from "../actions/order";
import { connect } from "react-redux";


const styles = theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            minWidth: 230,
        }
    },

    paper: {
        textAlign: 'center',
        height:'100%',
        marginTop: '5%',
        marginLeft: '25%',
        marginRight: '25%',
        marginButtom: '5%',
        padding: theme.spacing(2),
        backgroundImage: `url(${"/images/starmark_01.jpg"})`
    },
    gridItem: {
        textAlign: 'center',
        alignItems:"center",
        paddingTop:"20%",
        
    },
  
    textField: {
        width: '60%',
        margin: theme.spacing(1),
    },
    logoSize: {
        marginLeft: '30%',
        width: theme.spacing(30),
        height: theme.spacing(20),

    },

})

const StyledButton = withStyles({
    root: {
        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 48,
        width: 200,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
    },
    label: {
        textTransform: 'capitalize',
    },
})(Button);

const initialFieldValue = {
    id: 0,
    userName: "",
    password: "",
    showPassword: false,
}

const Login = ({ classes, ...props }) => {

    const [values, setValues] = useState(initialFieldValue)

    useEffect(() => {
       
    }, [])

    const handleInputChange = e => {

        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        })
    }

    const handlePasswordChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSubmit = e => {
        e.preventDefault();

        const onSuccess = () => {
            console.log("Submitted successfully.")
        }

        props.fetchLoginOrder(values.userName, values.password, onSuccess);
    }

    return (
        <Paper className={classes.paper} elevation={3}
        image="/images/logo_starmark.jpg"
        >
            <form autocomq="off" container className={classes.root} onSubmit={handleSubmit}>
                <Grid container>
                    <Grid item xs={12} className={classes.gridItem}>
                        <div style={{ padding: '5%' }}>
                            <Typography variant="h3">
                                Retail - SO
                            </Typography>
                            {/* <Avatar alt="Remy Sharp" src="/images/logo_starmark.jpg" className={classes.logoSize}></Avatar> */}
                        </div>

                        <TextField className={classes.textField}
                            name="userName"
                            label="User Name"
                            variant="filled"
                            value={values.userName}
                            onChange={handleInputChange}
                        />
                        <FormControl className={classes.textField} variant="filled">
                            <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
                            <FilledInput
                           
                                type={values.showPassword ? 'text' : 'password'}
                                value={values.password}
                                onChange={handlePasswordChange('password')}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                labelWidth={70}
                            />
                        </FormControl>
                        <div style={{ padding: '5%' }}>
                            <StyledButton type="submit">Login</StyledButton>
                        </div>

                    </Grid>

                </Grid>
            </form>
        </Paper>
    )
}

const mapStateToProps = state => ({
    orderList: state.order.list
})

const mapActionToProps = {
    fetchLoginOrder: actions.fetchLogin
}

export default connect(mapStateToProps, mapActionToProps) (withStyles(styles)(Login));
