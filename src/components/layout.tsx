import { PageProps } from 'gatsby';
import React from 'react';
import { Header, Footer } from './partials';

interface AuxProps {
    children?: React.ReactNode;
}

const Layout = ({ children }: AuxProps) => {
    return (
        <>
            <div id="root">
                <div className="max-w-screen-xl mx-auto">
                    <Header />
                    <main className="px-28 0xl:max-md:px-8 mt-44 0xl:max-md:mt-24">{children}</main>
                    <Footer />
                </div>
            </div>
        </>
    );
};

export default Layout;
