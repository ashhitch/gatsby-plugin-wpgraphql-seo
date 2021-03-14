/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { useStaticQuery } from 'gatsby';
import SEOContext from './SeoContext';

export const SEOProvider = (element, pluginOptions) => {
    const {
        [pluginOptions.key]: { seo },
    } = useStaticQuery(pluginOptions.rootQuery);
    debugger;
    return <SEOContext.Provider value={{ global: seo }}>{element}</SEOContext.Provider>;
};
