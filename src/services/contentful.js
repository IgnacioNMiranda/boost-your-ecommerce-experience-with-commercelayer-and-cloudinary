import { createClient } from 'contentful'

const contentfulClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_TOKEN,
})

export const getProduct = async (slug) => {
  const productEntries = await contentfulClient.getEntries({
    content_type: 'product',
    locale: 'en-US',
    include: 10,
    'fields.slug': slug,
  })

  const productEntry = productEntries.items?.length ? productEntries.items[0] : null
  return productEntry
}
