/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_VIRAL_LOOPS_CAMPAIGN_ID: 'VhKffvOvvEGKyvPhP1NYmdukkPQ',
    VIRAL_LOOPS_API_TOKEN: 'AZPQCg8tZKGX52hEZHf4Q30DVdU'
  },
  async headers() {
    return [
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/images/:path*.gif',
        headers: [
          {
            key: 'Content-Type',
            value: 'image/gif',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
