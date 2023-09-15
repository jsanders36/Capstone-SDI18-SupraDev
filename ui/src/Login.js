import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const Login = () => {
    const [usersSummary, setUsersSummary] = useState([])
    const navigate = useNavigate();
    
    useEffect(() => {
        usersRefetch();
    },[])

    const usersRefetch = async () => {
        await fetch('http://localhost:8080/users')
            .then((res) => res.json())
            .then((userFetchData) => {setUsersSummary(userFetchData); console.log(usersSummary);})
    }

}

export default Login;