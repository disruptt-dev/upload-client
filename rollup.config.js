import typescript from "rollup-plugin-typescript";

export default {
  input: "./src/index.ts",
  output: {
    name: "UploadClient",
    file: "./dist/umd/index.js",
    format: "umd",
    sourcemap: true,
  },
  plugins: [
    typescript({
      "target": "es5"
    }),
  ]
}