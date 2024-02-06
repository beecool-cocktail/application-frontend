import { StorybookConfig } from '@storybook/nextjs'

const config: StorybookConfig = {
  framework: {
    name: '@storybook/nextjs',
    options: {
      builder: {
        useSWC: true
      }
    }
  },
  stories: [
    '../stories/**/*.stories.mdx',
    '../stories/**/*.stories.@(js|jsx|ts|tsx)'
  ],
  addons: [
    '@storybook/addon-viewport',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    'storybook-addon-pseudo-states'
  ],
  staticDirs: ['../public'],
  typescript: {
    reactDocgen: 'react-docgen'
  },

  webpackFinal: webpackConfig => {
    if (!webpackConfig.module?.rules) return webpackConfig

    // This modifies the existing image rule to exclude `.svg` files
    // since we handle those with `@svgr/webpack`.
    const imageRule = webpackConfig.module.rules.find(rule => {
      if (typeof rule !== 'string' && rule.test instanceof RegExp) {
        return rule.test.test('.svg')
      }
    })

    if (!imageRule) return webpackConfig

    if (typeof imageRule !== 'string') {
      imageRule.exclude = /\.svg$/
    }

    webpackConfig.module.rules.push({
      test: /\.svg$/,
      use: [{ loader: '@svgr/webpack', options: { icon: true } }]
    })

    return webpackConfig
  },

  docs: {
    autodocs: true
  }
}

export default config
