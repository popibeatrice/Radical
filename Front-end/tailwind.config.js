module.exports = {
  content: ["./src/**/*.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "media",
  theme: {
    screens: {
      xxs: "350px",
      xs: "450px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      "3xl": "1700px",
    },
    extend: {
      colors: {},
      fontFamily: {
        logo: ["Cinzel Decorative", "cursive"],
        general: ["Poppins", "sans-serif"],
        title: ["Cormorant Garamond", "serif"],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
