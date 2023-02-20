module.exports = {
    plugins: [
        {
            resolve: `gatsby-source-wordpress`,
            options: {
                /*
                 * The full URL of the WordPress site's GraphQL API.
                 * Example : 'https://www.example-site.com/graphql'
                 */
                url: `https://api.wpgraphqlseo.com/graphql`,
            },
        },
        'gatsby-plugin-wpgraphql-seo',
    ],
};
