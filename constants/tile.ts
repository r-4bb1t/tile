import { CSSProperties } from "react";
import { Layout } from "react-grid-layout";
import { IconBaseProps } from "react-icons";

import { VscGithub, VscGithubAlt, VscGithubInverted, VscTwitter, VscMarkdown } from "react-icons/vsc";
import {
  AiFillInstagram,
  AiOutlineInstagram,
  AiFillFacebook,
  AiOutlineFacebook,
  AiFillLinkedin,
  AiOutlineLinkedin,
  AiFillAndroid,
  AiFillCode,
  AiOutlineAndroid,
  AiOutlineSlack,
  AiFillHeart,
} from "react-icons/ai";
import {
  FaReact,
  FaVuejs,
  FaAngular,
  FaNodeJs,
  FaJava,
  FaFigma,
  FaPython,
  FaSwift,
  FaDiscord,
  FaCss3Alt,
  FaHtml5,
  FaAws,
} from "react-icons/fa";
import {
  SiExpress,
  SiJavascript,
  SiTypescript,
  SiCsharp,
  SiCplusplus,
  SiC,
  SiFastapi,
  SiBootstrap,
  SiNextdotjs,
  SiDjango,
  SiRstudio,
  SiKotlin,
  SiIos,
  SiSpring,
  SiFirebase,
  SiLatex,
  SiAdobeaftereffects,
  SiAdobephotoshop,
  SiAdobeillustrator,
  SiAdobexd,
  SiMysql,
  SiPostgresql,
  SiVisualstudiocode,
  SiVisualstudio,
  SiStrapi,
  SiUnity,
  SiTailwindcss,
  SiNativescript,
  SiWindicss,
  SiStyledcomponents,
  SiVercel,
  SiAdobeindesign,
  SiHaskell,
  SiCoffeescript,
  SiAssemblyscript,
  SiXcode,
  SiFlutter,
} from "react-icons/si";
import { RiFileExcel2Fill, RiFileWord2Fill, RiFilePpt2Fill } from "react-icons/ri";

interface DefaultAssetType {
  style: CSSProperties;
  type: string;
  link?: string | null;
}

export interface StringType extends DefaultAssetType {
  str: string;
  type: "string";
}

export interface ImageType extends DefaultAssetType {
  url: string;
  type: "image";
}

export interface CommitType extends DefaultAssetType {
  id: string;
  type: "commit";
}

export interface SolvedacType extends DefaultAssetType {
  id: string;
  type: "solvedac";
  itemType: "tier" | "badge" | "class" | "profile";
}

export interface ListType extends DefaultAssetType {
  items: string[];
  type: "list";
}

export interface GridType extends DefaultAssetType {
  items: TileAssetType[];
  type: "grid";
}

export interface IconType extends DefaultAssetType {
  icon: GridIconsType;
  type: "icon";
  attributes: IconBaseProps;
}

export interface ConstantType extends DefaultAssetType {
  type: "constant";
  item: "solvedac" | "github";
  str: string;
}

export type TileAssetType =
  | StringType
  | ImageType
  | CommitType
  | SolvedacType
  | ListType
  | GridType
  | IconType
  | ConstantType;

export interface TileInterface extends Layout {
  background: string;
  type: string;
  assets: TileAssetType[];

  minW?: number;
  minH?: number;
}

export const Icons = {
  github1: VscGithub,
  github2: VscGithubAlt,
  github3: VscGithubInverted,
  twitter: VscTwitter,
  instagram1: AiFillInstagram,
  instagram2: AiOutlineInstagram,
  facebook1: AiFillFacebook,
  facebook2: AiOutlineFacebook,
  linkedin1: AiFillLinkedin,
  linkedin2: AiOutlineLinkedin,
  slack: AiOutlineSlack,
  discord: FaDiscord,
  code: AiFillCode,
  xcode: SiXcode,
  visualstudio: SiVisualstudio,
  vscode: SiVisualstudiocode,
  bootstrap: SiBootstrap,
  java: FaJava,
  spring: SiSpring,
  strapi: SiStrapi,
  kotlin: SiKotlin,
  android1: AiFillAndroid,
  android2: AiOutlineAndroid,
  swift: FaSwift,
  ios: SiIos,
  html: FaHtml5,
  css: FaCss3Alt,
  tailwindcss: SiTailwindcss,
  windicss: SiWindicss,
  styledcomponents: SiStyledcomponents,
  figma: FaFigma,
  markdown: VscMarkdown,
  c: SiC,
  csharp: SiCsharp,
  cpp: SiCplusplus,
  python: FaPython,
  django: SiDjango,
  fastapi: SiFastapi,
  rstudio: SiRstudio,
  firebase: SiFirebase,
  unity: SiUnity,
  aws: FaAws,
  haskell: SiHaskell,
  flutter: SiFlutter,
  mysql: SiMysql,
  postgressql: SiPostgresql,
  latex: SiLatex,
  react: FaReact,
  next: SiNextdotjs,
  vercel: SiVercel,
  angular: FaAngular,
  node: FaNodeJs,
  vue: FaVuejs,
  javascript: SiJavascript,
  typescript: SiTypescript,
  nativescript: SiNativescript,
  coffeescript: SiCoffeescript,
  assemblyscript: SiAssemblyscript,
  express: SiExpress,
  excel: RiFileExcel2Fill,
  word: RiFileWord2Fill,
  powerpoint: RiFilePpt2Fill,
  aftereffects: SiAdobeaftereffects,
  photoshop: SiAdobephotoshop,
  illust: SiAdobeillustrator,
  indesign: SiAdobeindesign,
  xd: SiAdobexd,
  heart: AiFillHeart,
};

export type GridIconsType = keyof typeof Icons;
