import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
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
import cc from "classcat";
import { IconType } from "react-icons";

const Icons = {
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
};

enum TAB {
  icons,
  assets,
}

export default function AddGridItem({ close, addItem }: { close: Function; addItem: Function }) {
  const addGridItemRef = useRef<HTMLDivElement>(null);
  const [tab, setTab] = useState(TAB.icons);

  useEffect(() => {
    document.addEventListener("mousedown", (e) => {
      if (
        addGridItemRef.current &&
        !addGridItemRef.current.contains(e.target as Node) &&
        !addGridItemRef.current.parentElement?.contains(e.target as Node)
      )
        close();
    });
  }, []);

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0, transition: { duration: 0.2 } }}
      className="absolute bottom-full w-max text-black text-left z-[100] -translate-y-3 origin-bottom bg-white p-4 drop-shadow-lg rounded flex flex-col items-center text-sm gap-2"
      ref={addGridItemRef}
    >
      <div className="w-full grid grid-cols-2 justify-center place-items-center mb-1">
        <button
          onClick={() => setTab(TAB.icons)}
          className={cc([
            "relative flex justify-center p-2",
            tab === TAB.icons &&
              "font-extrabold text-slate-500 after:absolute after:h-[2px] after:bottom-0 after:inset-x-4 after:bg-slate-400",
          ])}
        >
          Icons
        </button>
        <button
          onClick={() => setTab(TAB.assets)}
          className={cc([
            "relative flex justify-center p-2",
            tab === TAB.assets &&
              "font-extrabold text-slate-500 after:absolute after:h-[2px] after:bottom-0 after:inset-x-4 after:bg-slate-400",
          ])}
        >
          Assets
        </button>
      </div>
      <div className="grid grid-cols-8 gap-1 h-48 overflow-auto">
        {(Object.keys(Icons) as (keyof typeof Icons)[]).map((icon, i) => (
          <button
            className="w-8 h-8 flex items-center justify-center"
            key={i}
            onClick={() => addItem({ type: "icon", icon: Icons[icon], attributes: { classname: "p-2", size: "100%" } })}
          >
            {(Icons[icon] as IconType)({ size: "1.75rem" })}
          </button>
        ))}
      </div>
      <div className="border-x-transparent border-x-8 border-t-8 border-t-white absolute -bottom-1 w-0 h-0" />
    </motion.div>
  );
}
