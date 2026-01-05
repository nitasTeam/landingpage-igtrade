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

export default function Header() {
  const { language, setLanguage } = useTranslation();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white shadow-sm">
      <div className="h-16 flex items-center justify-between max-w-(--breakpoint-xl) mx-auto px-4 sm:px-6 lg:px-8">
        <Logo />
        {/* Desktop Menu */}
        <NavMenu className="hidden md:block text-foreground" />
        <div className="flex items-center gap-3">
          <Select value={language} onValueChange={(val: any) => setLanguage(val)}>
            <SelectTrigger className="w-[85px] sm:w-[150px] border-slate-200 shadow-none bg-white hover:bg-white hover:border-[#1D98C4] transition-colors focus:ring-0 text-slate-900 font-medium rounded-full px-3 sm:px-4 h-9 gap-2">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white border border-slate-100 shadow-xl rounded-xl min-w-[150px] p-1">
              <SelectItem value="id" className="cursor-pointer rounded-lg hover:bg-slate-50 focus:bg-slate-50 py-2.5">
                <span className="flex items-center gap-3 font-medium text-slate-700">
                  <span className="text-xl leading-none">🇮🇩</span> <span className="hidden sm:inline">Bahasa</span><span className="sm:hidden">ID</span>
                </span>
              </SelectItem>
              <SelectItem value="en" className="cursor-pointer rounded-lg hover:bg-slate-50 focus:bg-slate-50 py-2.5">
                <span className="flex items-center gap-3 font-medium text-slate-700">
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
