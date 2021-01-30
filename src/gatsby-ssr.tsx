import React from 'react';

import SEOContext from './SeoContext';

const SEOProvider = (element, pluginOptions) => {
  const {
    [pluginOptions.key]: { seo },
} = useStaticQuery(graphql`
    query SiteInfoQuery {
    
    }
`);


  return <SEOContext.Provider value={{ global: seo }}>{element}</SEOContext.Provider>
}

export const wrapRootElement = ({ element, props }, pluginOptions) => {

  if (pluginOptions.rootQuery) {

    return   SEOProvider(element, pluginOptions);
  }

  return element;
}
