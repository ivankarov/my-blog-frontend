import React from 'react';
import {Link} from 'react-router-dom';

const Navbar = () => {
    return (
        <nav style={{padding:'1rem',background:'#333',color:'white'}}>
            <Link to="/" style={{color:'white',marginRight:'1rem'}}>Home</Link>
            <Link to="/auth/login" style={{color:'white',marginRight:'1rem'}}>Login</Link>
            <Link to="/posts" style={{color:'white', marginRight:'1rem'}}>Posts</Link>
            <Link to="/auth/registration" sylte={{color:'white',marginRight:'1rem'}}>Registration</Link>
        </nav>
    );
};
export default Navbar;