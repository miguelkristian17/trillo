import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import classes from './MainNav.module.css'
import { connect } from 'react-redux'
import { logout } from "../../actions/auth"
import PropTypes from 'prop-types'

function MainNav({auth: {isAuthenticated, loading}, logout}) {

    const authLinks = (
        <ul>
            <li>
            <i className="fas fa-sign-out-al"></i>
                <Link onclick = {logout} to="/#">Logout</Link>
            </li>
        </ul>
    )

    const guestLinks = (
        <ul>
            <li>
                <Link to="/login" >Log in</Link>
            </li>
            <li>
                <Link to="/register" >Sign-up</Link>
            </li>
        </ul>
    )

    return (
        <header className = {classes.header}>
        <Link to="/"><div className = {classes.logo}>Trillo</div> </Link>
        <nav>
            {!loading && (<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>)}
        </nav>
        </header>
    )
}

MainNav.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {logout})(MainNav);
