import { SEOProvider } from './seoProvider';

export const wrapRootElement = ({ element }, pluginOptions) => {
    console.log(pluginOptions);
    if (pluginOptions.rootQuery) {
        return SEOProvider(element, pluginOptions);
    }

    return element;
};
