/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true
    },
    images: {
        domains: ['avatars.githubusercontent.com', 'assets-labs.hardel.io', 'assets-beta-labs.hardel.io']
    },
    reactStrictMode: true,
    swcMinify: true
};

module.exports = nextConfig;
