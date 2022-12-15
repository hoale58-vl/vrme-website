import * as React from 'react';
import { HeadFC, PageProps } from 'gatsby';
import { Layout } from '../components';

const MintToken: React.FC<PageProps> = () => {
    return (
        <Layout>
            <div className="mint-token-page">
                <div className="mint-token-title"></div>
            </div>
        </Layout>
    );
};

export default MintToken;

export const Head: HeadFC = () => <title>Mint Token</title>;
