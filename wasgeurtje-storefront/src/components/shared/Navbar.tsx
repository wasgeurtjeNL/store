"use client"

import { Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import React, { useState } from "react"
import logo from "../../public/images/logo.svg"
import searchIcon from "../../public/images/search-icon.svg"
import userIcon from "../../public/images/user-icon.svg"
import cartIcon from "../../public/images/cart-icon.svg"

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

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="w-full bg-black px-3 h-20 flex items-center justify-between relative mx-auto">
      {/* Left side: Menu + Logo + Brand Text */}
      <div className="flex items-center gap-2">
        {/* Mobile Menu Icon */}
        <button
          className="flex md:hidden text-white"
          onClick={() => setMenuOpen(true)}
        >
          <Menu size={28} />
        </button>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src={logo} alt="WASGEURTJE" width={173} height={34} />

          <p className="text-white text-sm leading-5 hidden lg:block">
            luxe wasparfum <br /> bekend van RTL4
          </p>
        </Link>
      </div>

      {/* Desktop Nav Links */}
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

      {/* Right side Icons */}
      <div className="flex items-center justify-end gap-3">
        <button className="nav-icon-btn text-white">
          {/* <Search /> */}
          <Image src={searchIcon} alt="search icon" />
        </button>
        <button className="nav-icon-btn text-white">
          {/* <CircleUserRound /> */}
          <Image src={userIcon} alt="user icon" />
        </button>
        <button className="nav-icon-btn text-white">
          {/* <ShoppingBag /> */}
          <Image src={cartIcon} alt="cart icon" />
        </button>
      </div>

      {/* Mobile Sidebar Menu */}
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-black transform ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50 p-5`}
      >
        <div className="flex justify-between items-center mb-8">
          <Image
            src="/images/logo.svg"
            alt="WASGEURTJE"
            width={120}
            height={30}
          />
          <button onClick={() => setMenuOpen(false)} className="text-white">
            <X size={28} />
          </button>
        </div>

        <div className="flex flex-col gap-5">
          {navList.map((item) => (
            <Link
              key={item.slug}
              href={item.slug}
              onClick={() => setMenuOpen(false)}
              className="text-white uppercase text-lg hover:text-[#FCCE4E]"
            >
              {item.title}
            </Link>
          ))}
        </div>
      </div>

      {/* Background overlay when menu open */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </nav>
  )
}

export default Navbar
