/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import SEOContext from './SeoContext';

export const SEOProvider = (element, key) => {
    const {
        [key]: { seo },
    } = useStaticQuery(graphql`
        query SiteInfoQuery {
            wp {
                seo {
                    contentTypes {
                        post {
                            title
                            schemaType
                            metaRobotsNoindex
                            metaDesc
                        }
                        page {
                            metaDesc
                            metaRobotsNoindex
                            schemaType
                            title
                        }
                    }
                    webmaster {
                        googleVerify
                        yandexVerify
                        msVerify
                        baiduVerify
                    }
                    schema {
                        companyName
                        personName
                        companyOrPerson
                        wordpressSiteName
                        siteUrl
                        siteName
                        inLanguage
                        logo {
                            sourceUrl
                            mediaItemUrl
                            altText
                        }
                    }
                    social {
                        facebook {
                            url
                            defaultImage {
                                sourceUrl
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
                            username
                        }
                        wikipedia {
                            url
                        }
                        youTube {
                            url
                        }
                    }
                }
            }
        }
    `);

    return <SEOContext.Provider value={{ global: seo }}>{element}</SEOContext.Provider>;
};
