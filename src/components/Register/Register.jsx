import { createUserWithEmailAndPassword, getAuth, sendEmailVerification } from 'firebase/auth';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import app from '../../firebase/firebase.init';

const auth = getAuth(app)

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [user, setUser] = useState('')


    const handleName = (e) => {
        const name = e.target.value;
        setName(name)
    }
   
    //handle email.
    const handleEmail = (e) => {
        const email = e.target.value;
        if (!/^\S+@\S+\.\S+$/.test(email)) {
            setError(`Please write email in correct way`)
            return
        }
        setEmail(email)
        setError('')

    }
    //Handle Password.
    const handlePassword = (e) => {
        const password = e.target.value;

        if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
            setError('Set at least Two uppercase letters')
            return;
        }
        if (password.length < 8) {
            setError('Password should be in 8 characters')
            return;
        }
        if (!/(?=.*\d)/.test(password)) {
            setError('Input at least on digit')
            return;
        }
        if (!/(?=.*[!#$%@&? "])/.test(password)) {
            setError('You have to set special character')
            return;
        }
        setPassword(password)
        setError('')
    }

    const handleRegister = () => {
        // e.preventDefault()
        if (name && email && password) {
            createUserWithEmailAndPassword(auth, email, password)
                .then(result => {
                    const user = result.user;
                    // setEmail(user)
                    swal("Hey !!", "Check you email to verify !", "warning");
                    verify(user)
                    console.log(user)
                })
                .catch(error => {
                setError(error.message);
            })
        } else {
            setError('Please Fill out all required inputs')
    }
    }
    
    //Verify email address.
    const verify = () => {
        sendEmailVerification(auth.currentUser)
            .then(() => {
            
        })
    }





    return (
        <div className='text-center'>
            <h2 className='text-4xl text-blue-600 font-extrabold my-6'>Please Register</h2>
            <div onClick={handleRegister} className='bg-green-600 pt-4 w-2/5 mx-auto rounded-xl'>
                <input onBlur={handleName} type="text" name='name' placeholder='Your name' className='w-96 p-3 rounded-md mb-4' required />

                <input onBlur={handleEmail} type="email" name="email" id="" placeholder='example@gmail.com' className='w-96 p-3 rounded-md mb-4' required />
                <br />
                <input onBlur={handlePassword} type="password" name="password" id="" placeholder='Password' className='w-96 p-3 rounded-md' required />
                <div className='bg-white border-2 p-2 my-6 rounded-md'>
                    <p className='font-bold text-red-500'><small>{ error}</small></p>
                <button className='btn bg-green-600 hover:bg-green-800 w-60 mt-1 text-lg font-bold' type="submit">Register</button>
                <p className='font-bold'><small>Already have an account ? click <Link className='underline text-lg text-blue-600' to='/login'>Log in</Link></small></p>
                </div>
            </div>
        </div>
    );
};

export default Register;