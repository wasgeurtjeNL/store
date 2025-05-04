import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"
import Hero from "components/home/Hero"
import ShopCategories from "components/home/ShopCategories"
import USPs from "components/home/USPs"
import Testimonials from "components/home/Testimonials"
import HowWorks from "components/home/HowWorks"
import PerfumeGrid from "components/home/PerfumeGrid"
import Sustainability from "components/home/Sustainability"
import CartDetails from "components/home/CartDetails"
import WashPointProgram from "components/home/WashPointProgram"
import OurStory from "components/home/OurStory"

export const metadata: Metadata = {
  title: "Medusa Next.js Starter Template",
  description:
    "A performant frontend ecommerce starter template with Next.js 15 and Medusa.",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params

  const { countryCode } = params

  const region = await getRegion(countryCode)

  const { collections } = await listCollections({
    fields: "id, handle, title",
  })

  if (!collections || !region) {
    return null
  }

  return (
    <>
      {/* <Hero />
      <div className="py-12">
        <ul className="flex flex-col gap-x-6">
          <FeaturedProducts collections={collections} region={region} />
        </ul>
      </div> */}
      <Hero />
      <ShopCategories />
      <USPs />
      <Testimonials />
      <HowWorks />
      <PerfumeGrid />
      <Sustainability />
      <CartDetails />
      <WashPointProgram />
      <OurStory />
    </>
  )
}
