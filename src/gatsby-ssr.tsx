import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useStaticQuery, graphql, PluginOptions, WrapRootElementNodeArgs } from 'gatsby';
import SEOContext from './SeoContext';

interface SeoPluginOptions extends PluginOptions {
    key?: string;
}

const SEOProvider = (element, key: string) => {
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

export const wrapRootElement = ({ element }: WrapRootElementNodeArgs, pluginOptions: SeoPluginOptions) => {
    if (pluginOptions.rootQuery) {
        const { key } = pluginOptions;
        return SEOProvider(element, key);
    }

    return element;
};
