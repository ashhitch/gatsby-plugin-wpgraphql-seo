import React, { createContext } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
// async function getSharedData(graphql, query, reporter) {
//     const { data: queryRecords, errors } = await graphql(query);

//     if (errors) {
//         reporter.panic(`Error executing the GraphQL query inside Yoast SEO plugin:\n`, errors);
//     }
// }

export const GlobalSeoSettings = createContext({});
GlobalSeoSettings.displayName = 'GlobalSeoSettings';

export const GlobalSeoSettingsProvider = ({ children }) => {
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
            }
        }
    `);

    return <GlobalSeoSettings.Provider value={data.seo}>{children}</GlobalSeoSettings.Provider>;
};

export const wrapRootElement = ({ element, pluginOptions }) => (
    <GlobalSeoSettingsProvider>{element}</GlobalSeoSettingsProvider>
);
