import  { createContext } from 'react';

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
  fixed: IFixed;
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

interface IGlobal {
  contentTypes: IContentTypes;
  webmaster: IWebmaster;
  schema: ISchema;
  social: ISocial;
}
interface ContextProps {
  global: IGlobal;
}
// Create a ui context
const SEOContext = createContext<Partial<ContextProps>>({});

export default SEOContext;
