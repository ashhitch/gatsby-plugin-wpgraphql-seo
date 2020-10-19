import React, { FC, useContext } from 'react';
import { Helmet } from 'react-helmet';

import SEOContext from './SeoContext';

interface SeoProps {
    title?: String;
    meta?: [];
    post?: any;
    uri?: null;
}

interface IOrgSchema {
    [x: string]: any;
    '@type': string | string[];
    '@id': string;
    name: any;
    url: any;
    sameAs: any[];
}

interface IWebsiteSchema {
    '@type': string;
    '@id': string;
    url: any;
    name: any;
    description: any;
    publisher: {
        '@id': string;
    };
    inLanguage: String;
}

interface IPageSchema {
    '@type': any;
    '@id': string;
    url: string;
    name: any;
    isPartOf: {
        '@id': string;
    };
    description: any;
    inLanguage: String;
    potentialAction: {
        '@type': string;
        target: string[];
    }[];
    datePublished?: string;
    dateModified?: string;
}

const SEO: FC<SeoProps> = ({ post = {}, meta = [], title, uri }) => {
    const { seo } = post;

    const { global } = useContext(SEOContext);
    const inLanguage = global?.schema?.inLanguage;

    const schema = global?.schema;
    const webmaster = global?.webmaster;
    const social = global?.social;

    const verification = [];

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

    const metaTitle = title || seo.title;
    const metaDescription = seo?.metaDesc ? seo.metaDesc : '';

    const pageUrl = seo?.canonical || `${schema?.siteUrl}${post?.uri || uri}`;

    // const logo = schema.logo && schema.logo.localFile.childImageSharp.fixed;

    const sameAs = social
        ? Object.entries(social)
              .map(([account, { url, username }]) => {
                  if (username || url) {
                      return username && account === 'twitter' ? `https://www.twitter.com/${username}` : url;
                  }
                  return null;
              })
              .filter(acc => !!acc)
        : [];

    const logo = schema?.logo
        ? {
              '@type': 'ImageObject',
              '@id': `${schema.siteUrl}/#${schema.companyOrPerson === 'person' ? 'personlogo' : 'logo'}`,
              inLanguage,
              url: `${schema.siteUrl}${schema.logo?.localFile?.childImageSharp?.fixed.src}`,
              width: schema.logo?.localFile?.childImageSharp?.fixed.width,
              height: schema.logo?.localFile?.childImageSharp?.fixed.height,
              caption: schema.logo.altText,
          }
        : null;

    const image = schema?.logo
        ? {
              '@id': `${schema.siteUrl}/#${schema.companyOrPerson === 'person' ? 'personlogo' : 'logo'}`,
          }
        : null;

    const orgSchema: IOrgSchema | null = schema
        ? {
              '@type': schema.companyOrPerson === 'person' ? ['Person', 'Organization'] : 'Organization',
              '@id': `${schema.siteUrl}/#${schema.companyOrPerson === 'person' ? '/schema/person' : 'organization'}`,
              name: schema.siteName,
              url: schema.siteUrl,
              sameAs,
              [schema.companyOrPerson === 'person' ? 'image' : 'logo']: logo,
              [schema.companyOrPerson === 'person' ? 'logo' : 'image']: image,
          }
        : null;

    const websiteSchema: Partial<IWebsiteSchema> = schema
        ? {
              '@type':
                  seo?.schema?.articleType && seo.schema.articleType.length >= 1 ? seo.schema.articleType : 'WebSite',
              '@id': `${schema.siteUrl}/#website`,
              url: schema.siteUrl,
              name: metaTitle,
              description: metaDescription,
              publisher: {
                  '@id': `${schema.siteUrl}/#organization`,
              },
              inLanguage,
          }
        : {};

    const pageSchema: Partial<IPageSchema> =
        post?.seo && schema
            ? {
                  '@type': seo?.schema?.pageType ? seo.schema.pageType : ['WebPage'],
                  '@id': `${pageUrl}#webpage`,
                  url: `${pageUrl}`,
                  name: seo.title,
                  isPartOf: { '@id': `${schema?.siteUrl}/#website` },
                  description: seo?.description,
                  inLanguage,
                  potentialAction: [
                      {
                          '@type': 'ReadAction',
                          target: [pageUrl],
                      },
                  ],
              }
            : {};

    if (pageSchema && post?.date) {
        pageSchema.datePublished = post.date;
    }
    if (pageSchema && post?.modified) {
        pageSchema.dateModified = post.modified;
    }

    const schemaObj = {
        '@context': 'https://schema.org',
        '@graph': [orgSchema, websiteSchema, pageSchema],
    };

    return (
        <Helmet
            htmlAttributes={{
                lang: inLanguage,
            }}
            title={metaTitle}
            meta={[
                {
                    name: `robots`,
                    content: `max-snippet:-1, max-image-preview:large, max-video-preview:-1`,
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
                    content: `en_GB`,
                },
                {
                    property: `og:type`,
                    content: `website`,
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
            ]
                .filter(m => !!m.content)
                .concat(meta, verification)}
            encodeSpecialCharacters={false}
        >
            <script type="application/ld+json">{JSON.stringify(schemaObj, null, 2)}</script>
        </Helmet>
    );
};

export default SEO;
