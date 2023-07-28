"use client"

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon, ArrowUpRightIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

export default function Sidebar() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme();
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [openSubList, setOpenSubList] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const copyEmailRef = useRef<HTMLButtonElement>(null);

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  const handleOpenSubList = () => {
    setOpenSubList(!openSubList)
  }

  const copyEmail = useCallback(() => {
    navigator.clipboard.writeText("gabrielalizmoreira@gmail.com");

    setCopiedEmail(true);

    setTimeout(() => {
      setCopiedEmail(false);
    }, 3000);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);


  if (!mounted) {
    return null;
  }

  return (
    <div>

      <button onClick={toggleSidebar} data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
        <span className="sr-only">Open sidebar</span>
          <Bars3Icon width={30} height={30} />
      </button>

      <aside id="default-sidebar" className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:w-72 lg:translate-x-0 fixed top-0 left-0 z-40 w-64 h-screen transition-transform`} aria-label="Sidebar">
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-zinc-900 border-r border-zinc-900/10 lg:px-6 lg:pb-8 lg:pt-4 dark:border-white/10 xl:w-80">
        <button onClick={toggleSidebar} data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className="inline-flex items-center p-2 mt-2 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
        <span className="sr-only">Open sidebar</span>
          <XMarkIcon width={30} height={30} />
        </button>
        <div className="flex items-center mb-8">
          <Image className="rounded-full" src={"/profile-picture.jpeg"} width={50} height={50} alt={"gabiliz picture"} />
          <h2 className="text-sm ml-4 font-semibold text-zinc-900 dark:text-white">Gabriela Liz</h2>
        </div>
          <ul role="list">
          <li className="relative mt-6 md:mt-0">
              <div className="relative mt-3 pl-2">
                <div className="absolute inset-y-0 left-2 w-px bg-zinc-900/10 dark:bg-white/5"></div>
                <ul role="list" className="border-l border-transparent">
                  <li className="relative">
                    <a href="/" className={`${pathname === '/' ? 'border-violet-600 dark:text-white text-zinc-900' : 'text-zinc-600 dark:text-zinc-400 border-transparent'} flex justify-between gap-2 py-1 pr-3 text-sm transition pl-4 hover:text-zinc-900 dark:hover:text-white border-l-2`}><span className="truncate">About me</span></a>
                  </li>
                  <li className="relative">
                    <a href="/projects" className={`${pathname === '/projects' ? 'border-violet-600 dark:text-white text-zinc-900' : 'text-zinc-600 dark:text-zinc-400 border-transparent'} flex justify-between gap-2 py-1 pr-3 text-sm transition pl-4 hover:text-zinc-900 dark:hover:text-white border-l-2`}><span className="truncate">Projects</span></a>
                  </li>
                  <li className="relative">
                    <a href="/experience" className={`${pathname === '/experience' ? 'border-violet-600 dark:text-white text-zinc-900' : 'text-zinc-600 dark:text-zinc-400 border-transparent'} flex justify-between gap-2 py-1 pr-3 text-sm transition pl-4 hover:text-zinc-900 dark:hover:text-white border-l-2`}><span className="truncate">Experience</span></a>
                  </li>
                  <li className="relative">
                    <a href="/education" className={`${pathname === '/education' ? 'border-violet-600 dark:text-white text-zinc-900' : 'text-zinc-600 dark:text-zinc-400 border-transparent'} flex justify-between gap-2 py-1 pr-3 text-sm transition pl-4 hover:text-zinc-900 dark:hover:text-white border-l-2`}><span className="truncate">Education</span></a>
                  </li>
                  <li className="relative">
                    <a href="/more" className={`${pathname === '/more' ? 'border-violet-600 dark:text-white text-zinc-900' : 'text-zinc-600 dark:text-zinc-400 border-transparent'} flex justify-between gap-2 py-1 pr-3 text-sm transition pl-4 hover:text-zinc-900 dark:hover:text-white border-l-2`}><span className="truncate">More</span></a>
                  </li>
                </ul>
              </div>
            </li>
            <li className="relative mt-6">
              <h2 className="text-xs font-semibold text-zinc-900 dark:text-white">Contact</h2>
              <div className="relative mt-3 pl-2">
                <div className="absolute inset-y-0 left-2 w-px bg-zinc-900/10 dark:bg-white/5"></div>
                <ul role="list" className="border-l border-transparent">
                  <li className="relative">
                    <a onClick={() => handleOpenSubList()} className="cursor-pointer flex justify-between gap-2 py-1 pr-3 text-sm transition pl-4 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"><span className="truncate">Resume</span></a>
                    {openSubList ?
                      <ul role="list">
                        <li>
                          <a href="/assets/Gabriela-Liz-Moreira-ptBR.pdf" target='_blank' className="flex justify-between gap-2 py-1 pr-3 text-sm transition pl-7 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"><span className="truncate">Resume pt-BR</span></a>
                        </li>
                        <li>
                          <a href="/assets/Gabriela-Liz-Moreira-enUS.pdf" target='_blank' className="flex justify-between gap-2 py-1 pr-3 text-sm transition pl-7 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"><span className="truncate">Resume en-US</span></a>
                        </li>
                      </ul>
                      : null}
                  </li>
                  <li className="relative">
                    <a href="https://github.com/gabiliz" target='_blank' className="flex items-center gap-2 py-1 pr-3 text-sm transition pl-4 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"><span className="truncate">Github</span>
                      <ArrowUpRightIcon width={10} height={10} />
                    </a>
                  </li>
                  <li className="relative">
                    <a href="https://www.linkedin.com/in/gabriela-liz-moreira/" target='_blank' className="flex items-center gap-2 py-1 pr-3 text-sm transition pl-4 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"><span className="truncate">Linkedin</span>
                      <ArrowUpRightIcon width={10} height={10} />
                    </a>
                  </li>
                  <li className="relative">
                    <button ref={copyEmailRef} onClick={copyEmail} className="flex justify-between gap-2 py-1 pr-3 text-sm transition pl-4 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">
                      {copiedEmail ? (
                        <span>Copied to clipboard!</span>
                        ) : (
                        <span className="truncate">E-mail</span>
                      )}
                    </button>
                  </li>
                </ul>
              </div>
            </li>
            <li className="sticky bottom-0 z-10 mt-6">
              <button className="flex justify-between gap-2 py-1 pr-3 text-sm transition pl-4 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                {theme === "light" ? (
                  <SunIcon width={15} height={15} />
                ) : (
                  <MoonIcon width={15} height={15} />
                )}
              </button>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  )
}