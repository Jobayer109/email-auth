import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <section className="dark:bg-gray-800 dark:text-gray-100 w-[70%] mx-auto">
        <div className="container justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
            <div className="text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
                <h1 className="text-5xl font-bold ">Email and Password Authentication...
                 
                </h1>
                
                <div className='flex mt-8'>
           <Link className='btn btn-primary w-36 mr-6' to='/login'>Log in</Link>
           <Link className='btn btn-primary w-36' to='/register'>Register</Link>
                    
                </div>
            </div>
            
        </div>
    </section>
    );
};

export default Home;