/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com'
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com'
      } ,
      {
        protocol: 'https',
        hostname: 'image.tmdb.org'
      },
      {
        protocol: 'https',
        hostname: 'www.themoviedb.org'
      }

    ]
  }

}

module.exports = nextConfig
