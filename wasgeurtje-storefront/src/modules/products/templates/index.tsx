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
import { CheckCircle } from "lucide-react"

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

  const featuresData = JSON.parse(product?.metadata?.features as string)

  console.log({ featuresData })

  return (
    <>
      <div
        className="content-container flex flex-col small:flex-row small:items-start py-6 relative gap-3 md:gap-6 bg-[#FAF7F2]"
        data-testid="product-container"
      >
        <div>
          <ImageGallary images={product?.images} />
          <div className="max-w-[636px]  w-full bg-[#F7F0E4] border border-[#D5AD60] mt-4 p-3  rounded-md">
            <h4 className="text-lg font-medium pb-2">We promise you</h4>
            <div className=" grid grid-cols-1 gap-2">
              {featuresData.map((item: string) => (
                <div key={item} className="flex  gap-2">
                  <CheckCircle className="text-[#D5AD60]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
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
      </div>
      <div className="product-container px-4 py-4 bg-[#FAF7F2]">
        {product.metadata.info}
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
