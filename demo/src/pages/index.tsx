import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import SEO from 'gatsby-plugin-wpgraphql-seo';

const IndexPage = ({ pageData }) => {
    console.log({ pageData });
    return (
        <main>
            <header>
                <h1>Yoast SEO</h1>
            </header>
        </main>
    );
};

export const Head = ({ pageData }) => {

    return <SEO post={pageData.post} />;
};

export default IndexPage;

export const pageQuery = graphql`
    query {
        post: wpPost {
            title
            seo {
                canonical
                title
                metaDesc
                focuskw
                metaRobotsNoindex
                metaRobotsNofollow
                opengraphAuthor
                opengraphDescription
                opengraphTitle
                opengraphDescription
                opengraphImage {
                    altText
                    sourceUrl
                    srcSet
                }
                opengraphUrl
                opengraphSiteName
                opengraphPublishedTime
                opengraphModifiedTime
                twitterTitle
                twitterDescription
                twitterImage {
                    altText
                    sourceUrl
                    srcSet
                }
                breadcrumbs {
                    url
                    text
                }
                cornerstone
                schema {
                    pageType
                    articleType
                    raw
                }
                readingTime
                fullHead
            }
        }
    }
`;
