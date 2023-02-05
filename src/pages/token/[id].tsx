import React from 'react';
import { HeadFC } from 'gatsby';
import Layout from 'components/layout';
import { TokenDetail } from 'components/token/tokenDetail';
import { TokenDetailProps } from 'components/token/types';

export default function TokenDetailPage(props: TokenDetailProps) {
    return (
        <Layout>
            <TokenDetail {...props} />
        </Layout>
    );
}

export const Head: HeadFC = () => <title>Token Detail</title>;
