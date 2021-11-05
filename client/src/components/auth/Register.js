import { useState} from "react";
import classes from "./LogInReg.module.css";
import {Link, Redirect} from 'react-router-dom'
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert"
import { register } from "../../actions/auth"
import PropTypes from "prop-types";

const Register = ({setAlert, register, isAuthenticated  }) => { 
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
        });

    const { name, username, email, password, confirmPassword } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setAlert("Passwords don't match", "danger");
            return;
        }
        register({ name, username, email, password });
    };

    if (isAuthenticated) {
        return <Redirect to="/home" />;
    }

    return (
        <div className="register">
            <div className= {classes.form}>
                <h1>Register</h1>
            <form onSubmit={e => onSubmit(e)}>
                <div className="register__form-group">
                    <label htmlFor="name">Name</label>
                    <input 
                    type="text" 
                    value = {name}
                    onChange = {e => onChange(e)}
                    name="name" 
                    />         
                </div>
                <div className="register__form-group">
                    <label htmlFor="username">Username</label>
                    <input 
                    type="text" 
                    name="username" 
                    value = {username}
                    onChange = {e => onChange(e)}
                    />         
                </div>
                <div className="register__form-group">
                    <label htmlFor="email">Email</label>
                    <input 
                    type="email" 
                    name="email" 
                    value = {email}
                    onChange={e => onChange(e)} />
                </div>
                <div className="register__form-group">
                    <label htmlFor="password">Password</label>
                    <input 
                    type="password" 
                    name="password" 
                    value = {password}
                    onChange={e => onChange(e)} />
                </div>
                <div className="register__form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input 
                    type="password" 
                    name="confirmPassword" 
                    value = {confirmPassword}
                    onChange={e => onChange(e)} />
                </div>
                <div className="register__form-group">
                    <input 
                    type="submit" 
                    // className="btn btn-primary" 
                    value="Register" 
            />
            </div>
        </form>
        <p >
        Already have an account? <Link to="/login">Sign In</Link>
        </p>
        </div>
        </div>
    )
    }

    Register.propTypes = {
        register: PropTypes.func,
        setAlert: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool
    }
    
    const mapStateToProps = state => ({
        isAuthenticated: state.auth.isAuthenticated
    })
    
    export default connect(mapStateToProps, { setAlert,register})(Register);