import { getProduct } from '../../../services/contentful'
import { getSkus } from '../../../services/commercelayer'
import { cookies } from 'next/headers'

export default async function PDP({ params }) {
  const product = await getProduct(params.slug)
  const authToken = cookies().get('ecommerce-token')

  const skuCodes = product.fields.variants.map((variant) => variant.fields.sku)
  const skusData = await getSkus(authToken.value, skuCodes)

  return (
    <div>
      <main style={{ padding: 20 }}>
        <h1>{product.fields.name}</h1>
        <p>Brand: {product.fields.brand}</p>
        <section>
          <h2>SKUS</h2>
          {skusData.map((sku) => (
            <div key={sku.code} style={{ display: 'flex', gap: 4 }}>
              <p>{sku.code}</p>
              <p>{sku.name}</p>
              <p>Price: {sku.prices[0].formatted_amount}</p>
              <p>Original Price: {sku.prices[0].formatted_compare_at_amount}</p>
              <p>Available Stock: {sku.stock_items[0].quantity}</p>
            </div>
          ))}
          <div></div>
        </section>
      </main>
    </div>
  )
}
