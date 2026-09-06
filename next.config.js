/** @type {import('next').NextConfig} */
const nextConfig = {
  // The dev server blocks cross-origin requests to /_next/* by default, which
  // silently breaks hydration when the site is reached through a tunnel or from
  // a phone on the LAN: the chunks 403, React never attaches, and every <button>
  // (menu, filter chips, accordion, language toggle) stops responding while
  // plain <a href> links keep working.
  //
  // Development only — `next start` ignores this.
  allowedDevOrigins: [
    '*.ngrok-free.app',
    '*.ngrok.app',
    '*.ngrok.io',
    '*.trycloudflare.com',
    // the LAN address `next dev` prints on startup
    '192.168.*.*',
  ],
}

module.exports = nextConfig
