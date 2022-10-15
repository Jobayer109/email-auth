import { EyeIcon } from '@heroicons/react/24/solid';
import { getAuth, GithubAuthProvider, GoogleAuthProvider, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import app from '../../firebase/firebase.init';


const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()
const githubProvider = new GithubAuthProvider()

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('')
    // const [passwordType, setPasswordType] = useState('password');
    // const [passwordInput, setPasswordInput] = useState('')

    const handleEmail = (e) => {
        const email = e.target.value;
        setEmail(email)
        console.log(email);
    }
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
        console.log(password)
        setError('')
    }

    const navigate = useNavigate();
    const handleSignIn = (e) => {
        e.preventDefault()
        
        if (email && password) {
            signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                const user = result.user;
                    swal("Good job!", "You are Logged in!", "success");
                    navigate("/")
                    
                })
                .catch(error => {
                setError(error.message)
            })
        } else {
            setError("Input your valid email and password")
        }
    }

    const handleSignOut = (e) => {
        e.preventDefault()
        signOut(auth).then(() => {
            
        })
            .catch(error => {
            setError(error.message)
        })
    }

    const handleResetPassword = (e) => {
        e.preventDefault()
        sendPasswordResetEmail(auth, email)
            .then(result => {
                const user = result.user;
                console.log(user);
                swal("Hey !", "Check your Email account!", "warning");

            })
            .catch(error => {
            setError(error.message)
        })
    }

    const googleSinIn = () => {
        signInWithPopup(auth, googleProvider)
            .then(result => {
                const user = result.user;
                console.log(user)
            })
        .catch(error=>{
            setError(error.message)
        })
    }

    const githubSignIn = () => {
        signInWithPopup(auth, githubProvider)
            .then(result => {
                const user = result.user;
                console.log(user)
            })
            .catch(error => {
            setError(error.message)
        })
    }


    return (
        <div className='text-center'>
            <h2 className='text-4xl text-blue-600 font-extrabold my-6'>Sign in</h2>
            <div className='bg-blue-600 pt-4 w-2/5 mx-auto rounded-xl'>
                <input onBlur={handleEmail} type="email" name="email" id="" placeholder='Email' className='w-96 p-3 rounded-md mb-4' required />
                <br />
                <div className='flex items-center ml-16'>
                    <input onBlur={handlePassword} type="password" name="password" id="" placeholder='Password' className='w-96 p-3 rounded-md' required />
                    <button><EyeIcon className="h-6 w-6 ml-1 text-white bg-blue-600"/></button>
                </div>
                <div className='bg-white border-2 my-6 rounded-md'>
                    <p className='font-bold text-red-500'><small>{error}</small></p>
                    <button onClick={handleSignIn} className='btn bg-blue-600 hover:bg-blue-700 w-36 mt-1' type="submit">Sign in</button>
                    
                <button onClick={handleSignOut} className='btn bg-red-600 hover:bg-red-700 w-36 mt-1 ml-6' type="submit">Sign out</button>
                    <p>Forget password ? <Link onClick={handleResetPassword} className='text-blue-500 underline font-semibold' to=''>Reset password</Link></p>
                    <p className='font-bold'><small>Do you have an account yet ? click <Link className='underline text-lg text-blue-600' to='/register'>Register</Link></small></p>
                    <div className=' flex items-center justify-evenly rounded-lg p-2 '>
                        <div>
                               <img  onClick={googleSinIn} className='h-8 w-8 cursor-pointer' src="https://seeklogo.com/images/G/google-2015-logo-65BBD07B01-seeklogo.com.png" alt="" />
                        </div>
                        <div>
                               <img className='h-8 w-8 cursor-pointer' src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/2048px-Facebook_f_logo_%282019%29.svg.png" alt="" />
                        </div>
                        <div onClick={githubSignIn}>
                               <img className='h-8 w-8 cursor-pointer' src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="" />
                        </div>
                        <div>
                               <img className='h-8 w-8 cursor-pointer' src="https://cdn-icons-png.flaticon.com/512/179/179345.png?w=360" alt="" />
                        </div>
                        <div>
                               <img className='h-8 w-8 cursor-pointer' src="https://cdn.pixabay.com/photo/2013/02/12/09/07/microsoft-80660_960_720.png" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;