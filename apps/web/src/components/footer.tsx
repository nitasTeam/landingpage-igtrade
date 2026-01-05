import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowUp } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";

export const Footer = () => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-white pt-20 pb-8 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Separator className="bg-slate-100 mb-12" />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          {/* Logo & Brand */}
          <div className="lg:col-span-4 flex flex-col items-start gap-6">
            <img src="/infinity-globalindo-logo.svg" alt="Infinity Globalindo" className="h-10 w-auto" />
            <p className="text-slate-500 leading-relaxed max-w-sm">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Address */}
          <div className="lg:col-span-4 space-y-8">
            <div>
               <h4 className="font-semibold text-slate-900 uppercase tracking-wider text-xs mb-4">{t('footer.head_office')}</h4>
               <p className="text-slate-600 leading-relaxed">
                 JL. PANTAI INDAH UTARA 2 PIK, Desa/Kelurahan Kapuk Muara,<br />
                 Kec. Penjaringan, Kota Adm. Jakarta Utara, DKI Jakarta, 14460
               </p>
            </div>
            <div>
               <h4 className="font-semibold text-slate-900 uppercase tracking-wider text-xs mb-4">{t('footer.workshop')}</h4>
               <p className="text-slate-600 leading-relaxed">
                 Ruko Kopi Mas Lantai 3, Jl Kopi 4 L, Roa Malaka Tambora<br />
                 Jakarta Barat, DKI Jakarta 11230
               </p>
            </div>
          </div>

          {/* Contact & Actions */}
          <div className="lg:col-span-4 flex flex-col lg:items-end justify-between gap-8">
            <div className="space-y-6 lg:text-right">
              <div>
                <h4 className="font-semibold text-slate-900 uppercase tracking-wider text-xs mb-2">{t('footer.phone')}</h4>
                <a href="tel:+6287775559883" className="text-slate-600 hover:text-[#1D98C4] transition-colors text-base">
                  +62 877-7555-9883
                </a>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 uppercase tracking-wider text-xs mb-2">{t('footer.email')}</h4>
                <a href="mailto:halo@igtrade.id" className="text-slate-600 hover:text-[#1D98C4] transition-colors text-base">
                  halo@igtrade.id
                </a>
              </div>
            </div>
            
            <Button 
              variant="outline" 
              onClick={scrollToTop} 
              className="group border-slate-200 text-slate-600 hover:text-[#1D98C4] hover:border-[#1D98C4] hover:bg-slate-50 transition-all duration-300"
            >
              {t('footer.back_to_top')} <ArrowUp className="ml-2 h-4 w-4 transition-transform group-hover:-translate-y-1" />
            </Button>
          </div>
        </div>

        <Separator className="bg-slate-100 mb-8" />
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-slate-500 text-sm">
          <p>© {year} PT Infinity Globalindo Trade. {t('footer.rights')}</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#1D98C4] transition-colors">{t('footer.privacy')}</a>
            <a href="#" className="hover:text-[#1D98C4] transition-colors">{t('footer.terms')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
