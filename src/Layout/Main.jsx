import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';

const userContext = React.createContext()

const Main = () => {
    return (
        <div>
            <userContext.Provider>
                    <Header></Header>
                    <Outlet></Outlet>
           </userContext.Provider>
            
        </div>
    );
};

export default Main;