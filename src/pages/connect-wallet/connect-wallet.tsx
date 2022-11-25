import * as React from 'react';
import type { HeadFC, PageProps } from 'gatsby';
import Header from '../partials/header';
import Footer from '../partials/footer';

const IndexPage: React.FC<PageProps> = () => {
    return (
        <div id="root">
            <div className="max-w-screen-xl mx-auto">
                <Header />

                <main className="px-28 0xl:max-md:p-8">
                    <h1>Tran nhat Huy</h1>
                </main>

                <Footer />
            </div>
        </div>
    );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
