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
    const data = useStaticQuery(graphql`
        query GetSeoConfig {
            seo {
                webmaster {
                    googleVerify
                    yandexVerify
                    msVerify
                    baiduVerify
                }
                schema {
                    siteName
                    wordpressSiteName
                    siteUrl
                    inLanguage
                    companyName
                    companyOrPerson
                    companyLogo {
                        mediaItemUrl
                    }
                    logo {
                        mediaItemUrl
                    }
                    personLogo {
                        mediaItemUrl
                    }
                }
                breadcrumbs {
                    showBlogPage
                    separator
                    searchPrefix
                    prefix
                    homeText
                    enabled
                    boldLast
                    archivePrefix
                    notFoundText
                }
                social {
                    facebook {
                        url
                        defaultImage {
                            mediaItemUrl
                        }
                    }
                    instagram {
                        url
                    }
                    linkedIn {
                        url
                    }
                    mySpace {
                        url
                    }
                    pinterest {
                        url
                        metaTag
                    }
                    twitter {
                        cardType
                        username
                    }
                    wikipedia {
                        url
                    }
                    youTube {
                        url
                    }
                    otherSocials
                }
                openGraph {
                    frontPage {
                        title
                        description
                        image {
                            altText
                            sourceUrl
                            mediaItemUrl
                        }
                    }
                    defaultImage {
                        altText
                        sourceUrl
                        mediaItemUrl
                    }
                }
                # contentTypes {
                #     post {
                #         title
                #         schemaType
                #         metaRobotsNoindex
                #         metaDesc
                #         schema {
                #             raw
                #         }

                #         archive {
                #             fullHead
                #             archiveLink
                #             breadcrumbTitle
                #             hasArchive
                #             metaDesc
                #             metaRobotsNoindex
                #             title
                #         }
                #     }
                #     page {
                #         metaDesc
                #         metaRobotsNoindex
                #         schemaType
                #         title
                #         schema {
                #             raw
                #         }
                #     }
                # }
            }
        }
    `);
    return <SEO post={pageData.post} gloabl={data.seo} />;
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
