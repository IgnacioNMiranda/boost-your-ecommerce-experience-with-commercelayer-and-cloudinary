import { getProduct } from '../../../services/contentful'
import { getSkus } from '../../../services/commercelayer'
import { cookies } from 'next/headers'
import { getImagesByTag } from '../../../services/cloudinary'
import { ProductDetailsPage } from '../../../components/product-details-page'

export default async function PDP({ params }) {
  const product = await getProduct(params.slug)
  const authToken = cookies().get('ecommerce-token')

  const skuCodes = product.fields.variants.map((variant) => variant.fields.sku)
  const skusData = await getSkus(authToken.value, skuCodes)
  const imagesData = await Promise.all(skusData.map((sku) => getImagesByTag(sku.code)))

  const productData = {
    name: product.fields.name,
    brand: product.fields.brand,
    variants: product.fields.variants
      .map((variant) => {
        const commerceLayerSku = skusData.find((skuData) => skuData.code === variant.fields.sku)
        // For the use case we ignore variants that don't have data in Commercelayer
        if (!commerceLayerSku) return undefined

        const skuImages = imagesData.find((imgData) => imgData.tag === variant.fields.sku)

        return {
          sku: variant.fields.sku,
          name: commerceLayerSku.name,
          price: commerceLayerSku.prices?.[0].formatted_amount,
          originalPrice: commerceLayerSku.prices?.[0].formatted_compare_at_amount,
          stock: commerceLayerSku.stock_items?.[0].quantity ?? 0,
          images: skuImages?.images ?? [],
          attributes: variant.fields.attributes.map((att) => ({ label: att.fields.label, value: att.fields.value })),
        }
      })
      .filter(Boolean),
  }

  return <ProductDetailsPage productData={productData} />
}
