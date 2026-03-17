import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Web3-Pilot',
    short_name: 'W3P',
    description: 'AI Growth & Security Lead for Web3 creators.',
    start_url: '/',
    display: 'standalone',
    background_color: '#09090b',
    theme_color: '#2563eb',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
