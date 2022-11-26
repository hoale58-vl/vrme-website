import * as React from 'react';
import type { HeadFC, PageProps } from 'gatsby';
import { Header } from '../components/partials';

const pageStyles = {
    color: '#232129',
    padding: 96,
    fontFamily: '-apple-system, Roboto, sans-serif, serif',
};

const IndexPage: React.FC<PageProps> = () => {
    return (
        <div className="max-w-screen-xl mx-auto">
            <Header />
        </div>
    );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
