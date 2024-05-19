import React, { useEffect } from 'react';
import { useAuth } from '../FavoriteBooksContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Logout = () => {
    const { setUser } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        const doLogout = async () => {
            setUser(null);
            localStorage.removeItem('auth-token');
            navigate('/');
        }
        doLogout();
    }, []);

    return (<></>);
}

export default Logout;