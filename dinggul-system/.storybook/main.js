/** @type { import('@storybook/react-webpack5').StorybookConfig } */
const config = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/preset-create-react-app',
    '@storybook/addon-onboarding',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
    '@storybook/addon-links',
    '@storybook/addon-a11y',
    '@whitespace/storybook-addon-html',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  staticDirs: ['..\\public'],
  features: {
    isFullscreen: false,
    panelPosition: 'right',
  },
  viteFinal: async config => {
    // GitHub Pages를 위한 base URL 설정
    if (process.env.BUILD_MODE === 'production') {
      config.base = '/Dinggul/';
    }
    return config;
  },
};
export default config;
