import React, { Component } from 'react'
import {UserSearchFunc} from './UserSearchFunc'
import './style.css';
export default class Home extends Component {
    render() {
        return (
            <div>
                <h1>Home</h1>
                <h2> Search </h2>
                <UserSearchFunc/>
            </div>
        )
    }
}
