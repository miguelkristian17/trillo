import React from 'react'
import MainNav from './MainNav'
import classes from './MainLayout.module.css'

const MainLayout = (props) => {
    return (
        <div>
        <MainNav/>
        <main className = {classes.main}>
            {props.children}
        </main>
        </div>
    )
}

export default MainLayout
