import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import { NavLink, Link, useLocation } from "react-router";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/hooks/use-translation";

export const NavMenu = (props: ComponentProps<typeof NavigationMenu>) => {
  const location = useLocation();
  const pathname = location.pathname;
  const { t } = useTranslation();

  const linkStyles = (isActive: boolean) => cn(
    "relative inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors hover:text-[#1D98C4] py-2 bg-transparent hover:bg-transparent focus:bg-transparent active:bg-transparent outline-none focus:outline-none ring-0 focus:ring-0",
    isActive ? "text-[#1D98C4]" : "text-slate-800",
    // Underline animation or static underline for active
    isActive && "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-[#1D98C4] after:content-['']"
  );

  return (
    <NavigationMenu {...props}>
      <NavigationMenuList className="gap-8 space-x-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start data-[orientation=vertical]:justify-start">
        <NavigationMenuItem>
          <Link 
            to="/about" 
            className={linkStyles(pathname === '/about')}
          >
            {t('nav.about')}
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger 
            className="group inline-flex items-center justify-center gap-1 whitespace-nowrap text-sm font-medium transition-colors hover:text-[#1D98C4] text-slate-800 focus:bg-transparent hover:bg-transparent data-[active]:text-[#1D98C4] data-[state=open]:text-[#1D98C4] bg-transparent !p-0 h-auto !bg-transparent data-[state=open]:!bg-transparent hover:!bg-transparent focus:!bg-transparent outline-none ring-0"
          >
            {t('nav.products')}
          </NavigationMenuTrigger>
          <NavigationMenuContent className="bg-white p-3 shadow-xl rounded-2xl min-w-[340px] border border-slate-100 mt-3 animate-in fade-in slide-in-from-top-3 duration-200">
              <ul className="grid gap-1">
                <li>
                  <NavLink to="/coming-soon" className="flex items-start gap-4 rounded-xl px-4 py-3 hover:bg-blue-50/60 transition-all group duration-200">
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-[#1D98C4] group-hover:bg-[#1D98C4] group-hover:text-white transition-all shadow-sm border border-slate-100 group-hover:border-blue-200">
                      <img src="/safety-box.svg" className="w-5 h-5 transition-transform group-hover:scale-110" alt="" />
                    </span>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-slate-900 font-semibold text-sm group-hover:text-[#1D98C4] transition-colors">Safety Box</span>
                      <span className="text-slate-500 text-xs leading-relaxed group-hover:text-slate-600">Secure storage & protection solutions</span>
                    </div>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/coming-soon" className="flex items-start gap-4 rounded-xl px-4 py-3 hover:bg-blue-50/60 transition-all group duration-200">
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-[#1D98C4] group-hover:bg-[#1D98C4] group-hover:text-white transition-all shadow-sm border border-slate-100 group-hover:border-blue-200">
                       <img src="/financial.svg" className="w-5 h-5 transition-transform group-hover:scale-110" alt="" />
                    </span>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-slate-900 font-semibold text-sm group-hover:text-[#1D98C4] transition-colors">Financial Tools</span>
                      <span className="text-slate-500 text-xs leading-relaxed group-hover:text-slate-600">Smart trading & finance systems</span>
                    </div>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/coming-soon" className="flex items-start gap-4 rounded-xl px-4 py-3 hover:bg-blue-50/60 transition-all group duration-200">
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-[#1D98C4] group-hover:bg-[#1D98C4] group-hover:text-white transition-all shadow-sm border border-slate-100 group-hover:border-blue-200">
                       <img src="/pneumatic.svg" className="w-5 h-5 transition-transform group-hover:scale-110" alt="" />
                    </span>
                     <div className="flex flex-col gap-0.5">
                      <span className="text-slate-900 font-semibold text-sm group-hover:text-[#1D98C4] transition-colors">Pneumatic</span>
                      <span className="text-slate-500 text-xs leading-relaxed group-hover:text-slate-600">Industrial & automation components</span>
                    </div>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/coming-soon" className="flex items-start gap-4 rounded-xl px-4 py-3 hover:bg-blue-50/60 transition-all group duration-200">
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-[#1D98C4] group-hover:bg-[#1D98C4] group-hover:text-white transition-all shadow-sm border border-slate-100 group-hover:border-blue-200">
                       <img src="/padel-tennis.svg" className="w-5 h-5 transition-transform group-hover:scale-110" alt="" />
                    </span>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-slate-900 font-semibold text-sm group-hover:text-[#1D98C4] transition-colors">Padel Racket</span>
                      <span className="text-slate-500 text-xs leading-relaxed group-hover:text-slate-600">Professional sports equipment</span>
                    </div>
                  </NavLink>
                </li>
              </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link 
            to="/contact-us" 
            className={linkStyles(pathname === '/contact-us')}
          >
            {t('nav.contact')}
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
  