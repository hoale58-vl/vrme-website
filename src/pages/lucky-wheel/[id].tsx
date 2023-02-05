import React from 'react';
import { HeadFC } from 'gatsby';
import Layout from 'components/layout';
import { TokenDetailProps } from 'components/token/types';

export default function LuckyWheelPage(props: TokenDetailProps) {
    return <Layout></Layout>;
}

export const Head: HeadFC = () => <title>Lucky Wheel</title>;
