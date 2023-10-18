/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true
    },
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'wiishy-backend.ir',
            // port: '',
            // pathname: '/account123/**',
          },
        ],
      },
}



module.exports = nextConfig
