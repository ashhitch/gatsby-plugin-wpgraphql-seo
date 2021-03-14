import { SEOProvider } from './seoProvider';

export const wrapRootElement = ({ element }, pluginOptions) => {
    if (pluginOptions.rootQuery) {
        return SEOProvider(element, pluginOptions);
    }

    return element;
};
