// eslint-disable-next-line no-undef
module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:import/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:@typescript-eslint/recommended",
    "eslint-config-prettier",
    "prettier",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
  ],
  settings: {
    react: {
      version: "detect",
    },
    // Tells eslint how to resolve imports
    "import/resolver": {
      node: {
        paths: ["src", "@/"],
        extensions: [".js", ".jsx", ".ts", ".tsx", ".mjs"],
      },
      typescript: {}, // this loads <rootdir>/tsconfig.json to eslint
    },
  },
  plugins: ["react", "@typescript-eslint", "autofix", "prettier"],
  rules: {
    // Add your own rules here to override ones from the extended configs.
    "import/extensions": "off",
    "react/jsx-filename-extension": ["warn", { extensions: [".tsx"] }],
    "max-len": ["warn", { code: 100 }],
    "no-console": "warn",
    "no-unused-vars": [
      "error",
      { vars: "all", args: "after-used", ignoreRestSiblings: false },
    ],
    "prettier/prettier": ["error", {}, { usePrettierrc: true }],
  },
};
