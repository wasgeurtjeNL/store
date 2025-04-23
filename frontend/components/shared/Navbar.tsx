import { CircleUserRound, Search, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'


interface INavItem {
    slug: string;
    title: string;
}
const navList:INavItem[] = [
    {
        slug: '/blogs',
        title: "blogs"
    },
    {
        slug: "/wasparfum",
        title: "wasparfum"
    },
    {
        slug: "/wasparfum-proefpakket",
        title: "wasparfum proefpakket"
    },
    {
        slug: "/contact",
        title: "contact"
    },
    
]

const Navbar = () => {
  return (
    <nav className='w-full bg-black px-3 h-20 flex items-center jusfity-between'>
        <div className='w-1/3 lg:w-3/4 flex items-center justify-start gap-[10px]'>
            <Image src={"/logo.png"} alt='WASGEURTJE' width={173} height={34}/>
            <p className='text-white text-[15.75px] leading-6 hidden lg:block'>luxe wasparfum <br />
            bekend van RTL4</p>
        </div>
        <div className='w-full hidden md:flex items-center justify-center gap-1'>
            {
                navList.map((item:INavItem) => 
                <Link key={item.slug} href={item.slug} className='text-white text-sm uppercase p-2 hover:text-[#FCCE4E]'>
                    {item.title}
                </Link>)
            }
        </div>
        <div className='w-1/3 flex items-center justify-end gap-3'>
            <button className='nav-icon-btn'>
                <Search />
            </button>
            <button className='nav-icon-btn'>
                <CircleUserRound />
            </button>
            <button className='nav-icon-btn'>
                <ShoppingBag />
            </button>
        </div>
    </nav>
  )
}

export default Navbar