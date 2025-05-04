"use client"
import React, { Suspense } from "react"
import ShopCat1 from "../../public/images/shopCat-1.svg"
import ShopCat2 from "../../public/images/shopCat-2.svg"
import ShopCat3 from "../../public/images/shopCat-3.svg"
import ShopCat4 from "../../public/images/shopCat-4.svg"
import Image, { StaticImageData } from "next/image"
import Link from "next/link"
// import dynamic from "next/dynamic";

// Dynamic imports for category images
// const PrCategoryOneImage = dynamic(
//   () =>
//     import("../images/SvgAssets").then((mod) => ({
//       default: mod.PrCategoryOneImage,
//     })),
//   {
//     loading: () => (
//       <div className="w-full aspect-square bg-gray-100 animate-pulse rounded-lg" />
//     ),
//     ssr: false,
//   }
// );

// const PrCategoryTwoImage = dynamic(
//   () =>
//     import("../images/SvgAssets").then((mod) => ({
//       default: mod.PrCategoryTwoImage,
//     })),
//   {
//     loading: () => (
//       <div className="w-full aspect-square bg-gray-100 animate-pulse rounded-lg" />
//     ),
//     ssr: false,
//   }
// );

// const PrCategoryThreeImage = dynamic(
//   () =>
//     import("../images/SvgAssets").then((mod) => ({
//       default: mod.PrCategoryThreeImage,
//     })),
//   {
//     loading: () => (
//       <div className="w-full aspect-square bg-gray-100 animate-pulse rounded-lg" />
//     ),
//     ssr: false,
//   }
// );

// const PrCategoryFourImage = dynamic(
//   () =>
//     import("../images/SvgAssets").then((mod) => ({
//       default: mod.PrCategoryFourImage,
//     })),
//   {
//     loading: () => (
//       <div className="w-full aspect-square bg-gray-100 animate-pulse rounded-lg" />
//     ),
//     ssr: false,
//   }
// );

interface Category {
  name: string
  image: StaticImageData
  href: string
}

const categories: Category[] = [
  {
    name: "Best Sellers",
    image: ShopCat1,
    href: `/categories/best`,
  },
  {
    name: "Premium Perfumes",
    image: ShopCat2,
    href: `/categories/premium`,
  },
  {
    name: "Trial Pack",
    image: ShopCat3,
    href: ``,
  },
  {
    name: "Gift Sets",
    image: ShopCat4,
    href: ``,
  },
]

const ShopCategories: React.FC = () => {
  return (
    <section className="py-8 px-4 md:px-0 max-w-7xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 w-full">
        {categories.map((category, index) => (
          <Link
            href={category.href}
            key={index}
            className="flex flex-col items-start md:items-center gap-3"
          >
            <Suspense
              fallback={<div className="w-full animate-pulse rounded-lg" />}
            >
              <Image
                src={category.image}
                alt={""}
                className="w-full h-full rounded-lg order-2 md:order-1"
              />
              {/* <category.ImageComponent /> */}
            </Suspense>
            <p className="text-lg md:text-[24px] font-semibold text-start md:text-center text-[#212529] order-1 md:order-2">
              {category.name}
            </p>
          </Link>
        ))}
      </div>
      <div className="flex justify-center mt-6">
        <Link
          href={"/collections/wasparfum"}
          className="bg-gradient-to-r from-[#FCCE4E] to-[#D6AD61] text-black uppercase py-2 px-6 rounded text-sm md:text-base"
        >
          Shop All Perfumes
        </Link>
      </div>
    </section>
  )
}

export default ShopCategories
