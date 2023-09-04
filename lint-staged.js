export default {
  "*.{ts,tsx}": ["eslint --max-warnings=0", () => "tsc-files --noEmit"],
  "*.{ts,tsx,json,css}": ["prettier --write"],
};
