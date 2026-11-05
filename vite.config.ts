import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import profile from './src/profile.json'

const siteUrl = profile.siteUrl.endsWith('/') ? profile.siteUrl : `${profile.siteUrl}/`
const escapeAttribute = (value: string) => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;')
const personSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: profile.name,
  url: siteUrl,
  email: `mailto:${profile.email}`,
  address: { '@type': 'PostalAddress', addressLocality: profile.location.split(',')[0], addressCountry: profile.countryCode },
  sameAs: [profile.linkedIn, profile.github],
  knowsAbout: ['Data Analytics', 'Machine Learning', 'Python', 'Java', 'SQL', 'Software Development'],
}).replaceAll('<', '\\u003c')

const replacements: Record<string, string> = {
  __SEO_DESCRIPTION__: escapeAttribute(profile.seoDescription),
  __SEO_KEYWORDS__: escapeAttribute(profile.seoKeywords),
  __SITE_URL__: escapeAttribute(siteUrl),
  __OG_TITLE__: escapeAttribute(`${profile.name} — Data Analytics & IT`),
  __OG_IMAGE__: escapeAttribute(`${siteUrl}og-image.png`),
  __OG_ALT__: escapeAttribute(`${profile.name} portfolio preview with dark navy background and cyan typography`),
  __PAGE_TITLE__: escapeAttribute(`${profile.name} | Data Analytics & IT Portfolio`),
  __PERSON_SCHEMA__: personSchema,
}

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'portfolio-metadata',
      transformIndexHtml(html: string) {
        return Object.entries(replacements).reduce((result, [token, value]) => result.replaceAll(token, value), html)
      },
      generateBundle() {
        this.emitFile({ type: 'asset', fileName: 'robots.txt', source: `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}sitemap.xml\n` })
        this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${siteUrl}</loc><changefreq>monthly</changefreq><priority>1.0</priority></url></urlset>\n` })
      },
    },
  ],
  base: '/',
})
