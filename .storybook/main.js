const path = require('path')

const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

module.exports = {
  core: { builder: 'webpack5' },
  stories: [
    '../stories/**/*.stories.mdx',
    '../stories/**/*.stories.@(js|jsx|ts|tsx)'
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    'storybook-addon-next',
    'storybook-addon-designs',
    'storybook-addon-pseudo-states',
    'storybook-dark-mode',
    'storybook-addon-swc'
  ],
  features: { emotionAlias: false },
  framework: '@storybook/react',
  webpackFinal: async config => {
    config.resolve.plugins = [
      ...(config.resolve.plugins || []),
      new TsconfigPathsPlugin({
        extensions: config.resolve.extensions
      })
    ]
    const rules = config.module.rules
    // modify storybook's file-loader rule to avoid conflicts with svgr
    const fileLoaderRule = rules.find(rule => rule.test.test('.svg'))
    const pathToInlineSvg = path.resolve(__dirname, '../lib/assets')
    fileLoaderRule.exclude = pathToInlineSvg

    rules.push({
      test: /\.svg$/,
      include: pathToInlineSvg,
      use: [{ loader: '@svgr/webpack', options: { icon: true } }]
    })

    return config
  },
  staticDirs: ['../public'],
  typescript: { reactDocgen: 'react-docgen' }
}
