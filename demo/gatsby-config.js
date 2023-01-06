require('dotenv').config({
    path: `.env`,
});

module.exports = {
    plugins: [
        `gatsby-plugin-wpgraphql-seo`,
        {
            resolve: `gatsby-source-wordpress`,
            options: {
                url: process.env.GATSBY_WORDPRESS_API_URL,
            },
        },
    ],
};
