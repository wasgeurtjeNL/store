import React, { Suspense } from "react"

import ImageGallery from "@modules/products/components/image-gallery"
import ProductActions from "@modules/products/components/product-actions"
import ProductOnboardingCta from "@modules/products/components/product-onboarding-cta"
import ProductTabs from "@modules/products/components/product-tabs"
import RelatedProducts from "@modules/products/components/related-products"
import ProductInfo from "@modules/products/templates/product-info"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import { notFound } from "next/navigation"
import ProductActionsWrapper from "./product-actions-wrapper"
import { HttpTypes } from "@medusajs/types"
import ProductPrice from "../components/product-price"
import Image from "next/image"
import ImageGallary from "components/custom/ImageGallary"
import ImageRating from "../../../public/images/star-rating.svg"
import ImageTPLogo from "../../../public/images/tp_logo.png"

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
}) => {
  if (!product || !product.id) {
    return notFound()
  }

  console.log({ product })

  return (
    <>
      <div
        // className="content-container flex flex-col small:flex-row small:items-start py-6 relative"
        className="content-container flex flex-col small:flex-row small:items-start py-6 relative gap-3 md:gap-6 bg-[#FAF7F2]"
        data-testid="product-container"
      >
        {/* <div className="flex flex-col small:sticky small:top-48 small:py-0 small:max-w-[300px] w-full py-8 gap-y-6">
          <ProductInfo product={product} />
          <ProductTabs product={product} />
        </div> */}
        {/* <div className="block w-full relative">
          <ImageGallery images={product?.images || []} />
        </div> */}
        {/* <div className="flex flex-col small:sticky small:top-48 small:py-0 small:max-w-[300px] w-full py-8 gap-y-12">
          <ProductOnboardingCta />
          <ProductPrice product={product} />
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
        </div> */}

        <div>
          <ImageGallary images={product?.images} />
        </div>
        <div>
          <div className="flex items-center flex-col md:flex-row gap-2 md:gap-5 px-2 md:px-6">
            <Image src={ImageRating} alt="a" height={30} width={100} />
            <p>Wasgeurtje scores a 9.8 from 1400+ reviews</p>
            <Image src={ImageTPLogo} alt="tp" height={60} width={100} />
          </div>
          <div className="pt-10">
            <div className="flex items-center justify-between pr-3">
              <ProductInfo product={product} />
              <ProductPrice product={product} />
            </div>
            <br />
            <ProductTabs product={product} />
          </div>
          <div className="pt-6">
            <ProductOnboardingCta />

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

        <div>
          {/* <div className="flex justify-center items-center gap-2">
            {product?.images?.length > 0 &&
              product.images?.map((image, index) => (
                <div
                  key={index}
                  className="border border-yellow-400/90 rounded-lg p-1 drop-shadow-lg group"
                >
                  <Image
                    src={image.url}
                    alt="product"
                    width={80}
                    height={80}
                    className="rounded-lg cursor-pointer group-hover:scale-110 transition-all duration-300"
                  />
                </div>
              ))}
          </div> */}
        </div>
      </div>
      <div
        className="bg-[#FAF7F2] px-4 md:px-12 py-4 md:py-8"
        data-testid="related-products-container"
      >
        <Suspense fallback={<SkeletonRelatedProducts />}>
          <RelatedProducts product={product} countryCode={countryCode} />
        </Suspense>
      </div>
    </>
  )
}

export default ProductTemplate
