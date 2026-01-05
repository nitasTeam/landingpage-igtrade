import { Logo } from "./logo";
import { NavMenu } from "./nav-menu";
import { NavigationSheet } from "./navigation-sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useTranslation } from "@/hooks/use-translation";
import { useLocation } from "react-router";
import { cn } from "@/lib/utils";

export default function Header() {
  const { language, setLanguage } = useTranslation();
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-300",
      isHome 
        ? "bg-transparent border-transparent absolute top-0" 
        : "bg-white border-b border-slate-100 shadow-sm"
    )}>
      <div className="h-20 flex items-center justify-between max-w-(--breakpoint-xl) mx-auto px-4 sm:px-6 lg:px-8">
        <Logo isWhite={isHome} />
        {/* Desktop Menu */}
        <NavMenu className="hidden md:block" isWhite={isHome} />
        <div className="flex items-center gap-3">
          <Select value={language} onValueChange={(val: any) => setLanguage(val)}>
            <SelectTrigger className={cn(
              "w-[85px] sm:w-[150px] shadow-none transition-all focus:ring-0 font-semibold rounded-full px-3 sm:px-4 h-10 gap-2 border",
              isHome 
                ? "bg-white/20 text-white border-white/40 hover:bg-white/30 hover:border-white/60 [&_svg]:text-white [&_svg]:opacity-100 [&_span]:!text-white" 
                : "bg-white text-slate-900 border-slate-200 hover:bg-white hover:border-[#1D98C4]"
            )}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white border border-slate-100 shadow-xl rounded-xl min-w-[150px] p-1">
              <SelectItem value="id" className="cursor-pointer rounded-lg hover:bg-slate-50 focus:bg-slate-50 py-2.5">
                <span className="flex items-center gap-3 font-medium text-slate-900">
                  <span className="text-xl leading-none">🇮🇩</span> <span className="hidden sm:inline">Bahasa</span><span className="sm:hidden">ID</span>
                </span>
              </SelectItem>
              <SelectItem value="en" className="cursor-pointer rounded-lg hover:bg-slate-50 focus:bg-slate-50 py-2.5">
                <span className="flex items-center gap-3 font-medium text-slate-900">
                  <span className="text-xl leading-none">🇬🇧</span> <span className="hidden sm:inline">English</span><span className="sm:hidden">EN</span>
                </span>
              </SelectItem>
            </SelectContent>
          </Select>
          {/* Mobile Menu */}
          <div className="md:hidden">
            <NavigationSheet />
          </div>
        </div>
      </div>
    </header>
  );
}
