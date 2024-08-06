/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
          {
            source: '/api/grafana/:path*',
            destination: 'http://grafana:3000/:path*',
          },
        ];
      },
      async headers() {
        return [
          {
            source: '/api/:path*',
            headers: [
              { key: 'Access-Control-Allow-Credentials', value: 'true' },
              { key: 'Access-Control-Allow-Origin', value: 'http://10.10.0.175:3000' }, // Grafana URL
              { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
              { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version' },
            ],
          },
        ];
      },
};

export default nextConfig;
