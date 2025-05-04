import { Text } from "@medusajs/ui"
import { listProducts } from "@lib/data/products"
import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"
import { Suspense } from "react"
import ProductActions from "../product-actions"
import ProductActionsWrapper from "@modules/products/templates/product-actions-wrapper"
import Image from "next/image"
import shapeImage from "../../../../public/images/fancy_shape.png"

export default async function ProductPreview({
  product,
  isFeatured,
  region,
  categoryName,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
  categoryName?: string
}) {
  // const pricedProduct = await listProducts({
  //   regionId: region.id,
  //   queryParams: { id: [product.id!] },
  // }).then(({ response }) => response.products[0])

  // if (!pricedProduct) {
  //   return null
  // }

  const { cheapestPrice } = getProductPrice({
    product,
  })

  return (
    <div className="group">
      {categoryName === "premium" ? (
        <div
          data-testid="product-wrapper"
          className="p-4 text-white relative "
          style={{
            // marginTop: "100px",
            background: `linear-gradient(0deg,#3d3521,#e9c356)`,
            padding: "4px",
            borderRadius: "3px",
          }}
        >
          <LocalizedClientLink href={`/products/${product.handle}`}>
            <div
              style={{
                background: "#0e1528",
                display: "block",
                paddingTop: "300px",
                paddingBottom: "20px",
                position: "relative",
              }}
            >
              <div
                className=" p-4"
                style={{
                  background: `url(${shapeImage.src})`,
                  position: "absolute",
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  top: "-80px",
                  zIndex: "3",
                  left: "0",
                  width: "100%",
                  minHeight: "300px",
                  maxWidth: "490px",
                  margin: "0 auto",
                  right: "0",
                }}
              >
                <Image
                  src={`${product?.images[0]?.url}`}
                  alt="product"
                  width={200}
                  height={200}
                  style={{
                    height: "100%",
                    width: "100%",
                    maxWidth: "180px",
                    maxHeight: "180px",
                    margin: "30px auto 0 auto",
                    display: "block",
                    objectFit: "contain",
                    objectPosition: "center",
                    borderRadius: "50%",
                  }}
                />
              </div>
              {/* <Thumbnail
            thumbnail={product.thumbnail}
            images={product.images}
            size="square"
            isFeatured={isFeatured}
          /> */}
              <div className="flex txt-compact-medium -mt-16 justify-between h-full items-end px-4">
                <LocalizedClientLink href={`/products/${product.handle}`}>
                  <Text
                    className="text-ui-fg-subtle text-xl"
                    data-testid="product-title"
                  >
                    {product.title}
                  </Text>
                </LocalizedClientLink>
                <div className="flex items-center gap-x-2 text-white">
                  {cheapestPrice && <p>{cheapestPrice.calculated_price}</p>}
                </div>
              </div>
              <div className="px-2">
                <Suspense
                  fallback={
                    <ProductActions
                      disabled={true}
                      product={product}
                      region={region}
                    />
                  }
                >
                  <ProductActionsWrapper id={product.id} region={region} />
                </Suspense>
              </div>
            </div>
          </LocalizedClientLink>
        </div>
      ) : (
        <div data-testid="product-wrapper group">
          <LocalizedClientLink href={`/products/${product.handle}`}>
            <Thumbnail
              thumbnail={product.thumbnail}
              images={product.images}
              size="square"
              isFeatured={isFeatured}
              className="group-hover:scale-105 transition-all duration-300"
            />
          </LocalizedClientLink>
          <div className="flex txt-compact-medium mt-4 justify-between">
            <LocalizedClientLink href={`/products/${product.handle}`}>
              <Text
                className="text-ui-fg-subtle text-xl"
                data-testid="product-title"
              >
                {product.title}
              </Text>
            </LocalizedClientLink>
            <div className="flex items-center gap-x-2">
              {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
            </div>
          </div>
          <div className="">
            <Suspense
              fallback={
                <ProductActions
                  disabled={true}
                  product={product}
                  region={region}
                />
              }
            >
              <ProductActionsWrapper id={product.id} region={region} />
            </Suspense>
          </div>
        </div>
      )}
    </div>
  )
}
