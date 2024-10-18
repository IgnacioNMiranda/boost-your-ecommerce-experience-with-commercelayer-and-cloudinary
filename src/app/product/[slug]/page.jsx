import { getProduct } from '../../../services/contentful'
import { getSkus } from '../../../services/commercelayer'
import { cookies } from 'next/headers'
import { getImagesByTag } from '../../../services/cloudinary'
import Image from 'next/image'

export default async function PDP({ params }) {
  const product = await getProduct(params.slug)
  const authToken = cookies().get('ecommerce-token')

  const skuCodes = product.fields.variants.map((variant) => variant.fields.sku)
  const skusData = await getSkus(authToken.value, skuCodes)
  const images = await Promise.all(skusData.map((sku) => getImagesByTag(sku.code)))

  return (
    <div>
      <main style={{ padding: 20 }}>
        <h1>{product.fields.name}</h1>
        <p>Brand: {product.fields.brand}</p>
        <section style={{ marginTop: 20 }}>
          <h2>SKUS</h2>
          <div style={{ display: 'flex', gap: 16, flexDirection: 'column' }}>
            {skusData.map((sku, idx) => (
              <div key={sku.code} style={{ display: 'flex', gap: 4, alignItems: 'center', flexWrap: 'wrap' }}>
                <p>{sku.code}</p>
                <p>{sku.name}</p>
                <p>Price: {sku.prices[0].formatted_amount}</p>
                <p>Original Price: {sku.prices[0].formatted_compare_at_amount}</p>
                <p>Available Stock: {sku.stock_items[0].quantity}</p>

                {/* We assume 0 here to use the first available image */}
                {images[idx]?.[0] && (
                  <div style={{ position: 'relative', width: 150, height: 100 }}>
                    <Image
                      src={images[idx][0]}
                      alt={sku.name}
                      fill
                      style={{
                        objectFit: 'contain',
                      }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
