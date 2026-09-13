export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Poppins", "sans-serif"],
        body: ["Inter", "sans-serif"]
      },
      colors: {
        brand: {
          50: "#eefdfb",
          100: "#d3f9f3",
          400: "#2dd4c4",
          500: "#0fb8a8",
          600: "#0b9a8d",
          700: "#0a7d73"
        },
        ink: "#0f172a"
      },
      boxShadow: {
        card: "0 10px 30px -12px rgba(15, 23, 42, 0.15)",
        cardHover: "0 20px 40px -15px rgba(15, 23, 42, 0.25)"
      }
    }
  },
  plugins: []
};
