# Gatsby SEO For WpGraphQL and Yoast

![npm](https://img.shields.io/npm/v/gatsby-plugin-wpgraphql-seo)

Takes data from [WpGraphQL](https://www.wpgraphql.com/) and [WPGraphQl Yoast SEO](https://github.com/ashhitch/wp-graphql-yoast-seo) and provides you with Meta Tags and JSON+LD Schema in Gatsby.

## Basic Setup

### Install package

Yarn or NPM install

```
yarn add gatsby-plugin-wpgraphql-seo
```

or

```
npm install gatsby-plugin-wpgraphql-seo
```

## Find this useful?

<a href="https://www.buymeacoffee.com/hafowuvo" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: 40px !important;width: auto !important;" ></a>

### Setup Gatsby

In your sites layout setup the context provider to pass the component your general site settings.

```jsx
import React, { useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { SEOContext } from 'gatsby-plugin-wpgraphql-seo';

export const Layout = () => {
    const {
        wp: { seo },
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
                            cardType
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

    return (
        <SEOContext.Provider value={{ global: seo }}>
            <p>... your layout</p>
        </SEOContext.Provider>
    );
};
```

Optionally you can pass options to the context via the `options` prop.

```jsx
    const options = {
        schemaReplacement: {
                from: 'EXAMPLE';
                to: 'TO_REPLACE';
            }
    }
return (
        <SEOContext.Provider value={{ global: seo, options }}>
            <p>... your layout</p>
        </SEOContext.Provider>
    );
```

Currently this only supports the `schemaReplacement` option. This will replace the `from` value with the `to` value in the JSON+LD Schema.

For each page or template you then need to add the SEO Component

```jsx
import React from 'react';
import { graphql } from 'gatsby';
import Seo from 'gatsby-plugin-wpgraphql-seo';

const Page = ({ data: { wpPage } }) => {
    return (
        <>
            <Seo post={wpPage} />
            <p>Rest of page</p>
        </>
    );
};

export default Page;

export const pageQuery = graphql`
    query GET_PAGE($id: String!) {
        wpPage(id: { eq: $id }) {
            nodeType
            title
            uri
            seo {
                title
                metaDesc
                focuskw
                metaKeywords
                metaRobotsNoindex
                metaRobotsNofollow
                opengraphTitle
                opengraphDescription
                opengraphImage {
                    altText
                    sourceUrl
                    srcSet
                }
                twitterTitle
                twitterDescription
                twitterImage {
                    altText
                    sourceUrl
                    srcSet
                }
                canonical
                cornerstone
                schema {
                    articleType
                    pageType
                    raw
                }
            }
        }
    }
`;
```

For archive pages

```jsx
import React from 'react';
import { graphql } from 'gatsby';
import Seo from 'gatsby-plugin-wpgraphql-seo';

const Blog = ({ data }) => {
    return (
        <>
            <Seo
                title="Blog Title"
                postSchema={JSON.parse(
                    data.wp.seo.contentTypes.post.schema.raw
                )}
            />
            <p>Rest of page</p>
        </>
    );
};

export default Blog;

export const pageQuery = graphql`
      query GET_POSTS($ids: [String]) {
      
          wp {
            seo {
                contentTypes {
                    post {
                        schema {
                            raw
                        }
                    }
                }
            }

          }
          allWpPost(filter: { id: { in: $ids } }) {
            nodes {
              ...
            }
          }
           
    }
    `;
```

Additional props are provided for overrides and simpler pages:

```

    title: String to override Title
    meta: Array of key value objects for meta tags (e.g property, content)
    post: WpGrahpQL post object
    postSchema: JSON object to replace complete JSON+LD schema;

```

### Removing search action from schema.

By default Yoast adds a search action to the schema if you want remove it you can add the following PHP to your functions.php file:

```php
<?php
add_filter('wpseo_schema_website', 'XX_remove_schema_search');
function XX_remove_schema_search($data)
{
  if ($data['potentialAction']) {
    foreach ($data['potentialAction'] as $key => $value) {

      if ($value['@type'] && $value['@type'] == 'SearchAction') {
        unset($data['potentialAction'][$key]);
      }
    }
  }

  return $data;
}

```

... More docs coming soon
