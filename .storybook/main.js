// const path = require('path');
module.exports = {
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      // propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
      propFilter: (prop) => {
        if (prop.declarations !== undefined && prop.declarations.length > 0) {
          const hasPropAdditionalDescription = prop.declarations.find((declaration) => {
            return !declaration.fileName.includes("node_modules");
          });
          return Boolean(hasPropAdditionalDescription);
        }
        return true;
      },
    },
  },
  "stories": [
    '../src/**/*.stories.@(js|mdx)',
    '../src/**/*.stories.tsx',
    "../src/styles/index.scss",
  ],
  "addons": [
    '@storybook/preset-scss',
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-controls",
    "@storybook/addon-actions",
    "@storybook/addon-docs",
  ],
  "framework": "@storybook/react",
}