// tailwind.config.js

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"], // 🔥 Tell Tailwind to scan your code files
  theme: {
    extend: {
      animation: {
        "loop-scroll": "loop-scroll 50s linear infinite",
      },
      keyframes: {
        "loop-scroll": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-100%)" },
        },
      },
    },
  },
  plugins: [],
};
