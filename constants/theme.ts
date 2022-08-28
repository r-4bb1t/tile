export const THEME = {
  monochrome: ["#DDDDDD", "#CCCCCC", "#BBBBBB"],
  rainbow: ["#CC99C9", "#9EC1CF", "#9EE09E", "#FDFD97", "#FEB144", "#FF6663"],
  violet: ["#355070", "#6D597A", "#B56576", "#E56B6F", "#EAAC8B"],
  greenery: ["#5E7DC2", "#00A1DE", "#00C1D9", "#00DCB8", "#92EF8D"],
  pink: ["#FF7D8C", "#D5586A", "#AD3349", "#85002B", "#5E000F"],
};

export type ThemeList = "monochrome" | "rainbow" | "violet" | "greenery" | "pink";

export const BACKDROP = {
  none: "none",
  brightness: "brightness(120%)",
  darkness: "brightness(90%)",
  contrast: "contrast(40%)",
  hue1: "hue-rotate(30deg)",
  hue2: "hue-rotate(90deg)",
  grayscale: "grayscale(70%)",
};

export type BackdropList = "none" | "brightness" | "darkness" | "contrast" | "hue1" | "hue2" | "grayscale";

export const SHADOW = [
  "none",
  "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
  "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
];
