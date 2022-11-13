/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true
    },
    images: {
        domains: ['avatars.githubusercontent.com']
    },
    optimizeFonts: false,
    reactStrictMode: true
};

module.exports = nextConfig;
