import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'development',
  // Production: false (tag-based revalidation via /api/revalidate)
  // Development: true (CDN for faster local loads)
  stega: {
    studioUrl: `${SITE_URL}/studio`,
  },
})
