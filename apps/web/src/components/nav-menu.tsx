import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuContent,
  } from "@/components/ui/navigation-menu";
  import { NavLink, Link } from "react-router";
  import type { ComponentProps } from "react";
  
  export const NavMenu = (props: ComponentProps<typeof NavigationMenu>) => (
    <NavigationMenu {...props}>
      <NavigationMenuList className="!border-none gap-3 space-x-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start data-[orientation=vertical]:justify-start">
        <NavigationMenuItem>
          <Link 
            to="/about" 
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all h-9 px-4 py-2"
            style={{
              color: window.location.pathname === '/about' ? 'rgba(219, 239, 255, 1)' : 'rgba(0, 0, 0, 1)',
              backgroundColor: window.location.pathname === '/about' ? 'rgba(29, 152, 196, 1)' : 'transparent'
            }}
            onMouseEnter={(e) => {
              if (window.location.pathname !== '/about') {
                e.currentTarget.style.backgroundColor = '#f3f4f6';
              }
            }}
            onMouseLeave={(e) => {
              if (window.location.pathname !== '/about') {
                e.currentTarget.style.backgroundColor = 'transparent';
              }
            }}
          >
            Tentang Kami
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all text-black bg-white hover:bg-gray-100 hover:text-black data-[state=open]:!bg-gray-100 data-[state=open]:!text-black h-9 px-4 py-2">Produk Kami</NavigationMenuTrigger>
          <NavigationMenuContent className="bg-white p-4 shadow-md min-w-72 !border-0 !bg-white bg-white" style={{ border: "none", backgroundColor: "white" }}>
            {/* <div className="rounded-2xl border bg-white p-4 shadow-md min-w-72"> */}
              <ul className="grid gap-2">
                <li>
                  <NavLink to="/coming-soon" className="flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-blue-50">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 text-blue-600 text-sm font-medium">1</span>
                    <span className="text-black">Safety Box</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/coming-soon" className="flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-blue-50">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 text-blue-600 text-sm font-medium">2</span>
                    <span className="text-black">Financial Tools</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/coming-soon" className="flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-blue-50">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 text-blue-600 text-sm font-medium">3</span>
                    <span className="text-black">Pneumatic</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/coming-soon" className="flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-blue-50">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 text-blue-600 text-sm font-medium">4</span>
                    <span className="text-black">Padel Racket</span>
                  </NavLink>
                </li>
              </ul>
            {/* </div> */}
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link 
            to="/contact-us" 
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all h-9 px-4 py-2"
            style={{
              color: window.location.pathname === '/contact-us' ? 'rgba(219, 239, 255, 1)' : 'rgba(0, 0, 0, 1)',
              backgroundColor: window.location.pathname === '/contact-us' ? 'rgba(29, 152, 196, 1)' : 'transparent'
            }}
            onMouseEnter={(e) => {
              if (window.location.pathname !== '/contact-us') {
                e.currentTarget.style.backgroundColor = '#f3f4f6';
              }
            }}
            onMouseLeave={(e) => {
              if (window.location.pathname !== '/contact-us') {
                e.currentTarget.style.backgroundColor = 'transparent';
              }
            }}
          >
            Hubungi Kami
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
  