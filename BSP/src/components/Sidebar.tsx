"use client"
import React from 'react'
import { Button } from './ui/button'
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { sidebarLinks } from '@/constants';
import { cn } from '@/lib/utils';
export const Sidebar = () => {
  const pathname = usePathname();
  console.log(pathname);
  const sidebarlinks=sidebarLinks
  console.log(sidebarlinks);
  
  // const pathname=usePathname()
  return (
    <div className=" bg-dc1  dark:bg-gray-950 h-full w-[20vw] min-w-[280px] p-6 flex flex-col gap-6 sticky left-0 top-0 bottom-0 rounded-md">
      {
        sidebarlinks.map((link,index)=>{
          const isActive = pathname === link.route || pathname.startsWith(`${link.route}/`);
          return (
            <Link href={link.route} key={index}  ><Button variant="outline" className={cn("flex items-center w-full hover:scale-110 justify-center gap-2",{
              'bg-dc3  text-white':isActive,
            })}>
      {/* <TrashIcon className="h-4 w-4" /> */}
      {link.label}
    </Button></Link>
          )
        })
      }
    
    
  </div>
  )
}
