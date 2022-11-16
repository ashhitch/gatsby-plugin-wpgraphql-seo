import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import SEO from 'gatsby-plugin-wpgraphql-seo';

const IndexPage = () => {
    return (
        <main>
            <header>
                <h1>Yoast SEO</h1>
            </header>
        </main>
    );
};

export const Head = () => <SEO />;

export default IndexPage;
