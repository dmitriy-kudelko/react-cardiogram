module.exports = {
  stories: ['../src/**/*.stories.tsx'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  babel: async ({ plugins, ...options }) => ({
    ...options,
    plugins: plugins.filter(
      plugin =>
        !(
          typeof plugin === 'string' &&
          plugin.includes('plugin-transform-classes')
        )
    )
  })
}
