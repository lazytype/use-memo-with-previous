import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";

const extensions = [".ts", ".tsx"];

const config = {
  input: "src/index.ts",
  output: {
    dir: "dist",
    format: "cjs",
    exports: "auto",
  },
  plugins: [
    resolve({ extensions }),
    babel({
      babelHelpers: "bundled",
      extensions,
    }),
  ],
  external: ["react"],
};

export default config;
