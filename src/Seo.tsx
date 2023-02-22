import { useStaticQuery, graphql } from 'gatsby';
import { getSrc } from 'gatsby-plugin-image';
import React, { FC, PropsWithChildren } from 'react';
import { SeoProps } from './type';

function replaceAll(str: string, subStr: string, newSubStr: string) {
    if (
        arguments.length !== 3 ||
        typeof str !== 'string' ||
        typeof subStr !== 'string' ||
        typeof newSubStr !== 'string'
    ) {
        throw new Error('Expects three string arguments');
    }
    if (!subStr) {
        return str;
    }
    return str.split(subStr).join(newSubStr);
}

const SEO: FC<PropsWithChildren<SeoProps>> = ({ post = {}, meta = [], title, postSchema, options, children }) => {
    const global = useStaticQuery(graphql`
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
    const { seo } = post;

    // Schema If manually passed or try get from post data
    let fullSchema;

    if (postSchema) {
        fullSchema = postSchema;
    } else if (seo && seo?.schema?.raw) {
        fullSchema = JSON.parse(seo.schema.raw);
    }
    // Proccess its for display

    if (options?.schemaReplacement?.from && options?.schemaReplacement?.to) {
        fullSchema = replaceAll(
            JSON.stringify(fullSchema),
            options.schemaReplacement.from,
            options.schemaReplacement.to
        );
    } else {
        fullSchema = JSON.stringify(fullSchema);
    }

    // const inLanguage = global?.schema?.inLanguage;

    const schema = global?.schema;
    const webmaster = global?.webmaster;
    const social = global?.social;

    const verification: any[] = [];

    if (webmaster?.baiduVerify) {
        verification.push({
            name: `baidu-site-verification`,
            content: webmaster.baiduVerify,
        });
    }
    if (webmaster?.googleVerify) {
        verification.push({
            name: `google-site-verification`,
            content: webmaster.googleVerify,
        });
    }
    if (webmaster?.msVerify) {
        verification.push({
            name: `msvalidate.01`,
            content: webmaster.msVerify,
        });
    }
    if (webmaster?.yandexVerify) {
        verification.push({
            name: `yandex-verification`,
            content: webmaster.yandexVerify,
        });
    }
    if (social?.pinterest && social.pinterest.metaTag) {
        verification.push({
            name: `p:domain_verify`,
            content: social.pinterest.metaTag,
        });
    }

    const metaTitle = title || seo?.title;
    const metaDescription = seo?.metaDesc ? seo.metaDesc : '';

    const robotsIndex = seo?.metaRobotsNoindex === 'noindex' ? 'noindex' : 'index';
    const robotsFollow = seo?.metaRobotsNofollow === 'nofollow' ? 'nofollow' : 'follow';

    const getReadingTime = (time: number) => (time === 1 ? '1 minute' : `${time} minutes`);

    const ogImage = getSrc(seo?.opengraphImage);
    const twitterImage = getSrc(seo?.twitterImage);

    const metaItems = [
        {
            name: `robots`,
            content: `max-snippet:-1, max-image-preview:large, max-video-preview:-1, ${robotsIndex}, ${robotsFollow}`,
        },
        {
            name: `description`,
            content: metaDescription,
        },
        {
            property: `og:site_name`,
            content: schema?.companyName,
        },
        {
            property: `og:title`,
            content: seo?.opengraphTitle || metaTitle,
        },
        {
            property: `og:description`,
            content: seo?.opengraphDescription,
        },
        {
            property: `og:locale`,
            content: seo?.schema?.inLanguage ? seo.schema.inLanguage.replace('-', '_') : null,
        },
        {
            property: `og:type`,
            content: `website`,
        },
        {
            property: 'og:image',
            content: ogImage || seo?.opengraphImage?.sourceUrl || social?.facebook?.defaultImage?.mediaItemUrl,
        },
        {
            property: 'og:image:alt',
            content: seo?.opengraphImage?.altText || social?.facebook?.defaultImage?.altText,
        },
        {
            name: `twitter:card`,
            content: social?.twitter.cardType,
        },
        {
            name: `twitter:creator`,
            content: social?.twitter.username,
        },
        {
            name: `twitter:title`,
            content: seo?.twitterTitle || metaTitle,
        },
        {
            name: `twitter:description`,
            content: seo?.twitterDescription || metaDescription,
        },
        {
            name: 'twitter:image',
            content: twitterImage || seo?.twitterImage?.sourceUrl,
        },
        {
            name: 'twitter:image:alt',
            content: seo?.twitterImage?.altText,
        },
        {
            name: 'twitter:label1',
            content: seo?.readingTime ? 'Estimated reading time' : null,
        },
        {
            name: 'twitter:data1',
            content: seo?.readingTime ? getReadingTime(+seo.readingTime) : '',
        },
    ]
        .filter((m) => !!m.content)
        .concat(meta, verification);

    return (
        <>
            <title>{metaTitle}</title>
            {metaItems.map((metaItem, index) => (
                <meta
                    id={`yoast-${metaItem?.name}`}
                    name={metaItem?.name}
                    property={metaItem?.property}
                    content={metaItem?.content as string}
                    key={index}
                />
            ))}
            {seo?.canonical && <link rel="canonical" href={seo.canonical} />}
            {fullSchema && (
                <script type="application/ld+json" id="yoast-seo-schema">
                    {JSON.stringify(fullSchema, undefined, process.env.NODE_ENV === 'development' ? 2 : 0)}
                </script>
            )}
            {children}
        </>
    );
};

export default SEO;
