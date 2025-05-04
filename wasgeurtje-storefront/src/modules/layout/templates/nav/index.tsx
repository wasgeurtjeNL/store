import { Suspense } from "react"

import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import Link from "next/link"
import Image from "next/image"
import logo from "../../../../public/images/logo.svg"
import searchIcon from "../../../../public/images/search-icon.svg"
import userIcon from "../../../../public/images/user-icon.svg"
import cartIcon from "../../../../public/images/cart-icon.svg"

interface INavItem {
  slug: string
  title: string
}

const navList: INavItem[] = [
  { slug: "/blogs", title: "blogs" },
  { slug: "/wasparfum", title: "wasparfum" },
  { slug: "/wasparfum-proefpakket", title: "wasparfum proefpakket" },
  { slug: "/contact", title: "contact" },
]

export default async function Nav() {
  const regions = await listRegions().then((regions: StoreRegion[]) => regions)

  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      <header className="relative h-16 mx-auto border-b duration-200 bg-black border-ui-border-base">
        <nav className="content-container txt-xsmall-plus text-ui-fg-subtle flex items-center justify-between w-full h-full text-small-regular">
          <div className="flex-1 basis-0 h-full flex items-center">
            <div className="h-full">
              <SideMenu regions={regions} />
            </div>
            <Link href="/" className="flex items-center gap-2">
              <Image src={logo} alt="WASGEURTJE" width={173} height={34} />

              <p className="text-white text-sm leading-5 hidden lg:block">
                luxe wasparfum <br /> bekend van RTL4
              </p>
            </Link>
          </div>

          <div className="flex items-center h-full">
            {/* <LocalizedClientLink
              href="/"
              className="txt-compact-xlarge-plus hover:text-ui-fg-base uppercase"
              data-testid="nav-store-link"
            >
              Medusa Store
            </LocalizedClientLink> */}
            <div className="hidden md:flex items-center justify-center gap-5">
              {navList.map((item) => (
                <Link
                  key={item.slug}
                  href={item.slug}
                  className="text-white text-sm uppercase p-2 hover:text-[#FCCE4E]"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
            <div className="hidden small:flex items-center gap-x-6 h-full">
              <LocalizedClientLink
                className="hover:text-ui-fg-base"
                href="/account"
                data-testid="nav-account-link"
              >
                <Image src={searchIcon} alt="search icon" />
              </LocalizedClientLink>
            </div>
            <div className="hidden small:flex items-center gap-x-6 h-full">
              <LocalizedClientLink
                className="hover:text-ui-fg-base"
                href="/account"
                data-testid="nav-account-link"
              >
                <Image src={userIcon} alt="search icon" />
              </LocalizedClientLink>
            </div>
            <Suspense
              fallback={
                <LocalizedClientLink
                  className="hover:text-ui-fg-base flex gap-2"
                  href="/cart"
                  data-testid="nav-cart-link"
                >
                  <Image src={cartIcon} alt="cart icon" /> (0)
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </nav>
      </header>
    </div>
  )
}
