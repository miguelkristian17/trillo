import { useState } from "react";
import classes from "./LogInReg.module.css";
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { login } from "../../actions/auth";


const Login = ({ login, isAuthenticated}) => { 
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        });

    const {email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        login({email, password });
    };

    if(isAuthenticated){
        return <Redirect to='/home' />
    }

    return (
        <div className="register">
            <div className= {classes.form}>
                <h2>Sign In</h2>
            <form onSubmit={e => onSubmit(e)}>   
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
                <div className="login-group">
                    <input 
                    type="submit" 
                    // className="btn btn-primary" 
                    value="Login" 
            />
            </div>
        </form>
        <p >
        Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
        </div>
        </div>
    )
    }


Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {login})(Login);