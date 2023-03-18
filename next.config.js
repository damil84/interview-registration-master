const nextConfig = {
  reactStrictMode: true,
  distDir: 'build',
  i18n: {
    locales: ['hu'],
    defaultLocale: 'hu',
  },
  eslint: {
    dirs: ['src'],
  },
  swcMinify: true,
};

module.exports = nextConfig;
