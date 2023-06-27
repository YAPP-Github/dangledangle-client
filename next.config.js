const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin');
const Dotenv = require('dotenv-webpack');
const withVanillaExtract = createVanillaExtractPlugin();

/** @type {import('next').NextConfig} */
const isLocal = process.env.NODE_ENV === 'development';
const nextConfig = {
  experimental: {
    appDir: true
  },
  webpack(config) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find(rule =>
      rule.test?.test?.('.svg')
    );

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/ // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: { not: /url/ }, // exclude if *.svg?url
        use: ['@svgr/webpack']
      }
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    config.plugins.push(
      new Dotenv({
        path: `.env.${isLocal ? 'local' : 'production'}`
      })
    );
    return config;
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dangledangle-image-storage.s3.ap-northeast-2.amazonaws.com',
        pathname: '/**'
      }
    ]
  }
};

module.exports = withVanillaExtract(nextConfig);
