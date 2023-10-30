export default function manifest() {
  return {
    name: 'Sociedade Portuguesa de Ginecologia',
    short_name: 'SPG',
    description: 'Construção da rede Carris Metropolitana',
    start_url: '/',
    theme_color: '#ffffff',
    background_color: '#ffffff',
    display: 'standalone',
    icons: [
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
