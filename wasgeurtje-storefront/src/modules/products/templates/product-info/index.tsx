"use client"
import { HttpTypes } from "@medusajs/types"
import { Heading, Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { CheckCircle } from "lucide-react"

type ProductInfoProps = {
  product: HttpTypes.StoreProduct
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  const {
    metadata: { benefits },
  } = product

  const benefitsData = JSON.parse(benefits)

  // console.log(benefitsData)

  return (
    <div id="product-info">
      <div className="flex flex-col gap-y-4 lg:max-w-[500px] mx-auto">
        {product.collection && (
          <LocalizedClientLink
            href={`/collections/${product.collection.handle}`}
            className="text-medium text-ui-fg-muted hover:text-ui-fg-subtle"
          >
            {product.collection.title}
          </LocalizedClientLink>
        )}
        <Heading
          level="h2"
          className="text-3xl leading-10 text-ui-fg-base"
          data-testid="product-title"
        >
          {product.title}
        </Heading>

        <Text
          className="text-medium text-ui-fg-subtle whitespace-pre-line"
          data-testid="product-description"
        >
          {product.description}
        </Text>

        <div className="">
          <h4>What you will experience</h4>
          <ul className="flex flex-col gap-2 pt-2">
            {benefitsData.map((item: string) => (
              <li key={item} className="flex gap-2 items-center">
                <CheckCircle className="text-[#D5AD60]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div></div>
    </div>
  )
}

export default ProductInfo
