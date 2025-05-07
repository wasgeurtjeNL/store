import { Product } from "@medusajs/medusa"

type CustomProduct = Product & {
  benefits?: string[]
  features?: string[]
  info?: string
}

const ProductDetails = ({ product }: { product: CustomProduct }) => {
  return (
    <div>
      {/* ... existing product details ... */}
      
      {product.benefits && product.benefits.length > 0 && (
        <div>
          <h3>Benefits</h3>
          <ul>
            {product.benefits.map((benefit, index) => (
              <li key={index}>{benefit}</li>
            ))}
          </ul>
        </div>
      )}

      {product.features && product.features.length > 0 && (
        <div>
          <h3>Features</h3>
          <ul>
            {product.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
      )}

      {product.info && (
        <div>
          <h3>Additional Information</h3>
          <p>{product.info}</p>
        </div>
      )}
    </div>
  )
}

export default ProductDetails