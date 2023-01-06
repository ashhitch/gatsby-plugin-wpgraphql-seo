import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import SEO from 'gatsby-plugin-wpgraphql-seo';

const IndexPage = ({ data }) => {
    console.log(data);
    return (
        <main>
            <header>
                <h1>Yoast SEO</h1>
                <pre>
                    <code>{JSON.stringify(data.wpPost.seo, null, 2)}</code>
                </pre>
            </header>
        </main>
    );
};

export const Head = ({ data }) => <SEO post={data.wpPost} />;

export default IndexPage;

export const pageQuery = graphql`
    query {
        wpPost(id: { eq: "cG9zdDox" }) {
            id
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
            author {
                node {
                    seo {
                        metaDesc
                        metaRobotsNofollow
                        metaRobotsNoindex
                        title
                        social {
                            youTube
                            wikipedia
                            twitter
                            soundCloud
                            pinterest
                            mySpace
                            linkedIn
                            instagram
                            facebook
                        }
                    }
                }
            }
        }
    }
`;
