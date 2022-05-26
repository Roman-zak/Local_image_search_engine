import React, { Component } from 'react'
import AdminForm from './AdminForm'
import { AdminSearchFunc } from './AdminSearchFunc'
import './style.css';
//import Admin_Search from  './Admin_Search'
export default class Admin extends Component {
    render() {
        return (
            <div>
                <h2> Upload </h2>
                <AdminForm/>
                
                <AdminSearchFunc/>
            </div>
        )
    }
}
