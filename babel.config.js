module.exports = {
  presets: [
    ["@babel/preset-react", { runtime: "automatic" }], // For React
    "@babel/preset-env", // For modern JavaScript
    "@babel/preset-typescript" // For TypeScript support
  ],
  plugins: [
    "@babel/plugin-syntax-import-attributes" // Enables experimental import attributes
  ],
};
