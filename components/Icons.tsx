import cc from "classcat";

export const HomeIcon = ({ selected }: { selected: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    id="Layer_1"
    version="1.1"
    viewBox="0 0 16 16"
    xmlSpace="preserve"
    className={cc(["stroke-slate-400 fill-slate-400 transition-all", selected && "!stroke-slate-500 !fill-slate-500"])}
  >
    <path d="M15.45,7L14,5.551V2c0-0.55-0.45-1-1-1h-1c-0.55,0-1,0.45-1,1v0.553L9,0.555C8.727,0.297,8.477,0,8,0S7.273,0.297,7,0.555  L0.55,7C0.238,7.325,0,7.562,0,8c0,0.563,0.432,1,1,1h1v6c0,0.55,0.45,1,1,1h3v-5c0-0.55,0.45-1,1-1h2c0.55,0,1,0.45,1,1v5h3  c0.55,0,1-0.45,1-1V9h1c0.568,0,1-0.437,1-1C16,7.562,15.762,7.325,15.45,7z" />
  </svg>
);

export const ImageIcon = ({ selected }: { selected: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="16"
    viewBox="0 0 149 132"
    className={cc(["stroke-slate-400 fill-slate-400 transition-all", selected && "!stroke-slate-500 !fill-slate-500"])}
  >
    <path d="M143.209,105.968c0,6.25-5.113,11.364-11.363,11.364H18.203c-6.25 0-11.363-5.113-11.363-11.364v-86.37c0-6.25,5.113-11.363 11.363-11.363h113.643c6.25,0,11.363,5.113,11.363,11.363V105.968z M18.203,17.326c-1.207,0-2.271,1.068-2.271,2.271v86.37c0,1.207,1.065 2.271,2.271,2.271h113.643c1.203,0,2.274-1.064 2.274-2.271v-86.37c0-1.203-1.071-2.271-2.274-2.271H18.203z M38.661,53.691c-7.529,0-13.641-6.108-13.641-13.635s6.112-13.638,13.641-13.638 c7.526,0,13.632,6.111,13.632,13.638S46.188,53.691,38.661,53.691z M125.025,99.15H25.02V85.51l22.73-22.724l11.363,11.36l36.365-36.361l29.547,29.547V99.15z" />
  </svg>
);
