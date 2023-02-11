import React from 'react';
import { ToastContainer } from 'react-toastify';
import Footer from './footer';
import Header from './header';

interface AuxProps {
    children?: React.ReactNode;
}

const Body = ({ children }: AuxProps) => {
    return (
        <>
            <ToastContainer />
            <div className="max-w-screen-xl mx-auto">
                <Header />
                {children}
                <Footer />
            </div>
        </>
    );
};

export default Body;
