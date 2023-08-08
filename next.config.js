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
}

module.exports = nextConfig
