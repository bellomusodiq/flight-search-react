import React from 'react';
import {Link} from 'react-router-dom';
import './Header.css';

const header = () => (
    <div className="Header">
        <div className="Logo">Flight Search</div>
        <div className="Links">
            <Link to='/'>Home</Link>
        </div>
    </div>
)

export default header;