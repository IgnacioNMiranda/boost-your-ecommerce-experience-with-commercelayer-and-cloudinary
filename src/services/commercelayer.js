import { authenticate } from '@commercelayer/js-auth'
import { CommerceLayer } from '@commercelayer/sdk'

export const getToken = async () => {
  const clientId = process.env.COMMERCELAYER_CLIENT_ID
  const clientSecret = process.env.COMMERCELAYER_CLIENT_SECRET
  const slug = process.env.COMMERCELAYER_ORGANIZATION_SLUG
  const scope = process.env.COMMERCELAYER_SCOPE

  if (clientId && clientSecret && slug) {
    const auth = await authenticate('client_credentials', {
      slug,
      clientId,
      scope,
      clientSecret,
    })
    return { token: auth.accessToken, expires: auth.expires }
  }

  return { token: undefined }
}

export const getSkus = async (token, skuCodes) => {
  try {
    const cl = CommerceLayer({
      organization: process.env.COMMERCELAYER_ORGANIZATION_SLUG,
      accessToken: token,
    })

    const skus = await cl.skus.list({
      filters: { code_in: skuCodes.join(',') },
      include: ['prices', 'stock_items'],
    })

    return skus
  } catch (error) {
    console.error(error)
    return []
  }
}
