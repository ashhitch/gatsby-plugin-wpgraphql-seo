import React, { FC, useContext } from 'react';
import { Helmet } from 'react-helmet';

import SEOContext from './SeoContext';

interface SeoProps {
    title?: String;
    meta?: [];
    post?: any;
    postSchema?: IPageSchema;
}

interface IPageSchema {
    '@context': string;
    '@graph': IPageSchemaItems[];
}
interface IPageSchemaItems {
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

const SEO: FC<SeoProps> = ({ post = {}, meta = [], title, postSchema }) => {
    const { seo } = post;

    const { global } = useContext(SEOContext);
    const inLanguage = global?.schema?.inLanguage;

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

    const metaTitle = title || seo.title;
    const metaDescription = seo?.metaDesc ? seo.metaDesc : '';

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
            {postSchema && <script type="application/ld+json">{JSON.stringify({ ...postSchema }, null, 2)}</script>}
        </Helmet>
    );
};

export default SEO;
