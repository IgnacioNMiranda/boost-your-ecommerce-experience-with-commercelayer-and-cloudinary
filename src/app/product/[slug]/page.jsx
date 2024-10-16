import { getProduct } from '../../../services/contentful'

export default async function PDP({ params }) {
  const product = await getProduct(params.slug)

  return (
    <div>
      <main style={{ padding: 20 }}>
        <p>Name: {product.fields.name}</p>
        <p>Brand: {product.fields.brand}</p>
        <ul style={{ listStyle: 'inside' }}>
          SKUS
          {product.fields.variants.map((variant) => (
            <li key={variant.fields.sku}>{variant.fields.sku}</li>
          ))}
        </ul>
      </main>
    </div>
  )
}
