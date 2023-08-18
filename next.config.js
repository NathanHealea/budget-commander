/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => {
    let redirects = [];

    if (process.env.NODE_ENV === 'production') {
      redirects.push({
        source: '/theme',
        destination: '/',
        permanent: true,
      });
    }

    return redirects;
  },
  reactStrictMode: true,
  webpack: (webpackConfig, { webpack }) => {
    webpackConfig.plugins.push(
      // Remove node: from import specifiers, because Next.js does not yet support node: scheme
      // https://github.com/vercel/next.js/issues/28774
      new webpack.NormalModuleReplacementPlugin(/^node:/, (resource) => {
        resource.request = resource.request.replace(/^node:/, '');
      }),
    );

    return webpackConfig;
  },
};

module.exports = nextConfig;

