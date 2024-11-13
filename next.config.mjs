/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            "paepiqvgneysangkcqgs.supabase.co"
        ]
    },
    // async headers() {
    //     return [
    //         {
    //             source: '/_next/image',
    //             headers: [
    //                 {
    //                     key: 'Cache-Control',
    //                     value: 'public, max-age=31536000, immutable'
    //                 }
    //             ]
    //         }
    //     ];
    // }
};

export default nextConfig;
