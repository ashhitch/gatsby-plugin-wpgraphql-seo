import { PluginOptions, WrapRootElementNodeArgs } from 'gatsby';
import { SEOProvider } from './seoProvider';

interface SeoPluginOptions extends PluginOptions {
    key?: string;
}

export const wrapRootElement = ({ element }: WrapRootElementNodeArgs, pluginOptions: SeoPluginOptions) => {
    if (pluginOptions.rootQuery) {
        const { key } = pluginOptions;
        return SEOProvider(element, key);
    }

    return element;
};
