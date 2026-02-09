// tailwind.config.js
import typography from "@tailwindcss/typography";

export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            lineHeight: "1.8",
            p: {
              marginTop: "1em",
              marginBottom: "1em",
            },
            h1: { fontWeight: "700" },
            h2: { fontWeight: "600" },
            h3: { fontWeight: "600" },
            blockquote: {
              fontStyle: "normal",
              borderLeftWidth: "4px",
            },
            img: {
              borderRadius: "0.75rem",
              marginTop: "1.5rem",
              marginBottom: "1.5rem",
            },
            pre: {
              backgroundColor: "rgb(15 23 42)",
              color: "rgb(226 232 240)",
              borderRadius: "0.75rem",
            },
          },
        },
      },
    },
  },
  plugins: [typography],
};
