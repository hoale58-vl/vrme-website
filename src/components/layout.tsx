import { PageProps } from 'gatsby';
import React from 'react';
import { Header, Footer } from './partials';

interface AuxProps {
    children?: React.ReactNode;
}

const Layout = ({ children }: AuxProps) => {
    return (
        <div className="max-w-screen-xl mx-auto">
            <Header />
            <main className="md:px-[115px] md:py-20 md:mt-[100px] px-[30px] py-10">{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;
