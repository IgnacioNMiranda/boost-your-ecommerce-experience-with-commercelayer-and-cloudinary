'use client'

import Image from 'next/image'
import { useState } from 'react'
import styles from './product-details-page.module.css'

export const ProductDetailsPage = ({ productData }) => {
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0)

  const selectedVariant = productData.variants[selectedVariantIdx]
  const hasDiscount = selectedVariant.price !== selectedVariant.originalPrice

  return (
    <div>
      <main className={styles.container} style={{ paddingTop: 48 }}>
        <div className={styles['main-grid']}>
          {/* Product Images */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {selectedVariant.images.map((img) => {
              return (
                <div key={img} style={{ position: 'relative', width: '100%', height: 500, backgroundColor: '#FFF' }}>
                  <Image
                    src={img}
                    alt={selectedVariant.name}
                    fill
                    style={{
                      objectFit: 'contain',
                    }}
                  />
                </div>
              )
            })}
          </div>

          {/* Product Information */}
          <section>
            <h1 style={{ fontSize: '3rem', lineHeight: 1 }}>{productData.name}</h1>
            <p style={{ fontSize: '1rem', lineHeight: 1.5 }}>{productData.brand}</p>
            <p style={{ fontSize: '1.125rem', lineHeight: 1.75 }}>SKU: {selectedVariant.sku}</p>

            {/* Prices */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
              <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{selectedVariant.price}</p>
              {selectedVariant.originalPrice && hasDiscount && (
                <p style={{ color: '#774430', fontSize: '2rem', textDecorationLine: 'line-through' }}>
                  {selectedVariant.originalPrice}
                </p>
              )}
            </div>

            <p style={{ fontSize: '1.1rem' }}>
              {selectedVariant.stock ? `Stock: ${selectedVariant.stock}` : 'No available stock'}
            </p>

            {/* Variant Options */}
            <div style={{ marginTop: 16 }}>
              <p style={{ fontSize: '1.3rem', lineHeight: '1.25rem', fontWeight: 'bold', marginBottom: 8 }}>Options</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {productData.variants.map((variant, idx) => {
                  return (
                    <div key={variant.sku}>
                      <input
                        type="radio"
                        name="variant-selector"
                        onChange={() => setSelectedVariantIdx(idx)}
                        style={{ accentColor: 'black', marginRight: 8 }}
                        checked={idx === selectedVariantIdx}
                      />
                      {variant.attributes.map((att) => `${att.label}:${att.value}`).join(', ')}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Add To Cart Button */}
            <button
              onClick={() => {
                alert(`Product ${selectedVariant.sku} added to cart!`)
              }}
              className={styles['add-to-cart-button']}
            >
              Add to Cart
            </button>
          </section>
        </div>
      </main>
    </div>
  )
}
