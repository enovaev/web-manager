module.exports = {
  extends: ['airbnb-typescript', 'plugin:jsx-a11y/recommended'],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "react/prop-types": "off",
  },
  env: {
    browser: true,
  },
  plugins: [
    "jsx-a11y",
  ]
};
