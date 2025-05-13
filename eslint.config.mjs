import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfigConfig = {
  ...compat.config({
    extends: ['next/core-web-vitals', 'next/typescript', 'prettier', 'plugi:tailwindcss/recommended'],
    plugins: ['prettier'],
    rules: {
      'pretier/prettier': 'error',
      'react/no-escape-entities': 'off',
    },
  })
}

export default eslintConfig;
