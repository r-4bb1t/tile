module.exports = {
  content: ["./**/*.{ts,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        custom: {
          primary: "#570DF8",
          secondary: "#F000B8",
          accent: "#37CDBE",
          neutral: "#3D4451",
          "base-100": "#FFFFFF",
          info: "#3ABFF8",
          success: "#36D399",
          warning: "#FBBD23",
          error: "#F87272",
        },
      },
    ],
  },
  plugins: [
    require("daisyui"),
    function ({ addVariant }) {
      addVariant("child", "& > *");
      addVariant("child-hover", "& > *:hover");
      addVariant("child-focus", "& > *:focus");
    },
  ],
};
