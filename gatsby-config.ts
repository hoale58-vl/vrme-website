import type { GatsbyConfig } from 'gatsby';
import path from 'path';

const config: GatsbyConfig = {
    siteMetadata: {
        title: `ViMRE`,
        siteUrl: `https://www.vimre.com`,
    },
    // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
    // If you use VSCode you can also use the GraphQL plugin
    // Learn more at: https://gatsby.dev/graphql-typegen
    graphqlTypegen: true,
    plugins: [
        'gatsby-plugin-resolve-src',
        'gatsby-plugin-postcss',
        'gatsby-plugin-sass',
        'gatsby-plugin-antd',
        'gatsby-plugin-image',
        'gatsby-transformer-remark',
        'gatsby-plugin-sharp',
        'gatsby-transformer-sharp',
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                name: 'images',
                path: './static/images/',
            },
            __key: 'images',
        },
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                name: 'pages',
                path: './src/pages/',
            },
            __key: 'pages',
        },
        {
            resolve: `gatsby-plugin-alias-imports`,
            options: {
                alias: {
                    envConfig: path.resolve(__dirname, `src/config/${process.env.ENV}`),
                },
                extensions: [],
            },
        },
    ],
};

export default config;
