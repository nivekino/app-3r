module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        yellowr: "#FFF3D9",
        greenr: "#38720B",
        greencard: "#38720B",
      },
      backgroundImage: {
        'reuseCard': "url('./images/reuse.jpg')",
        'reduceCard': "url('./images/reduce.jpg')",
        'recycleCard': "url('./images/recycle.jpg')",
        '1': "url('./images/bg-3r.png')",
      },
      width: {
        48: "47%",
      },
    },
  },
  plugins: [],
};
