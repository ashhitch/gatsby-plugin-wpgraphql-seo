import { IGatsbyImageData } from 'gatsby-plugin-image';

import { PluginOptions as GatsbyPluginOptions } from 'gatsby';

interface IPost {
    title: string;
    schemaType: string;
    metaRobotsNoindex: boolean;
    metaDesc: string;
}

interface IContentTypes {
    [x: string]: IPost;
}

interface IWebmaster {
    googleVerify: string;
    yandexVerify: string;
    msVerify: string;
    baiduVerify: string;
}

interface IFixed {
    src: string;
    width: number;
    height: number;
}
interface IChildImageSharp {
    fixed?: IFixed;
    gatsbyImageData?: IGatsbyImageData;
}

interface ILocalFile {
    childImageSharp: IChildImageSharp;
}

interface ILogo {
    mediaItemUrl: string;
    altText: string;
    localFile: ILocalFile;
}

interface ISchema {
    companyName: string;
    personName: string;
    companyOrPerson: string;
    wordpressSiteName: string;
    siteUrl: string;
    siteName: string;
    inLanguage: string;
    logo: ILogo;
}

interface IDefaultImage {
    mediaItemUrl: string;
    altText: string;
}

interface IScocialAccount {
    url?: string;
    defaultImage?: IDefaultImage;
    username?: string;
    cardType?: string;
    metaTag?: string;
}

interface ISocial {
    facebook: IScocialAccount;
    instagram: IScocialAccount;
    linkedIn: IScocialAccount;
    mySpace: IScocialAccount;
    pinterest: IScocialAccount;
    twitter: IScocialAccount;
    wikipedia: IScocialAccount;
    youTube: IScocialAccount;
}

export interface IGlobal {
    contentTypes: IContentTypes;
    webmaster: IWebmaster;
    schema: ISchema;
    social: ISocial;
}
export interface IOptions {
    schemaReplacement?: {
        from: string;
        to: string;
    };
}



export interface SeoProps {
    title?: String;
    meta?: [];
    post?: any;
    postSchema?: IPageSchema | IPageSchema[];
    global: IGlobal;
    options: IOptions;
}

export interface IPageSchema {
    '@context': string;
    '@graph': IPageSchemaItems[];
}

export interface IPageSchemaItems {
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


export interface PluginOptions extends GatsbyPluginOptions {
    query: string;
}
