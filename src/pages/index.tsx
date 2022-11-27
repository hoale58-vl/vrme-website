import * as React from 'react';
import type { HeadFC, PageProps } from 'gatsby';
import { Header, Footer } from '../components/partials';

const pageStyles = {
    color: '#232129',
    padding: 96,
    fontFamily: '-apple-system, Roboto, sans-serif, serif',
};

const IndexPage: React.FC<PageProps> = () => {
    return (
        <div className="max-w-screen-xl mx-auto">
        <Header />
        <div className="m-32"></div>
            <Footer />
        </div>
    );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
