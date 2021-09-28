import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import User from '../components/User'
import { useParams } from 'react-router-dom'

function UserProfile() {
    const { id } = useParams()
    const [user, setUser] = useState({
        name: '',
        email:'',
    });

    useEffect(()=>{
        axios.get(`http://localhost:5000/api/users/61438b01dc85106ef4db31cd`)
        .then((res) => {
            const data = res.data
            setUser({ name: data.name, email: data.email });
        })
        .catch(()=>{
            alert('Error retrieving User')
        })
    }, [])

    if(user){
        return(
            <div>
                <h2>{user.name}</h2>
                <p>{user.email}</p>
            </div>
        )

    }
        
    

    return (
        <div>
            <header className="user-Profile"> user profile </header>
            <p>Hi my name is {}</p>
            <User/>
        </div>
    )
}

export default UserProfile
