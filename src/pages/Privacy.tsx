import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useLocale } from "../hooks/useLocale";

const Privacy = () => {
    const navigate = useNavigate();
    const { locale, t } = useLocale();

    return (
        <div className="min-h-screen font-sans bg-[#0A0A0A] text-[#A3A3A3] p-6 md:p-12">
            <div className="max-w-2xl mx-auto mt-12 md:mt-20">
                <button
                    onClick={() => navigate(`/${locale}`)}
                    className="flex items-center gap-2 mb-12 text-xs uppercase tracking-widest hover:text-[#F5F5F5] transition-colors"
                >
                    <ArrowLeft className="w-3 h-3" /> Back
                </button>

                <h1 className="text-xl md:text-2xl font-light text-[#F5F5F5] mb-8">{t('legal.privacy.title')}</h1>
                <p className="mb-12 opacity-80 text-sm">{t('legal.privacy.intro')}</p>

                <div className="space-y-10 text-sm leading-relaxed font-light">

                    <section>
                        <h2 className="text-xs font-bold uppercase tracking-widest text-[#525252] mb-3">{t('legal.privacy.sections.general.title')}</h2>
                        <p className="opacity-80">
                            {t('legal.privacy.sections.general.text')}
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xs font-bold uppercase tracking-widest text-[#525252] mb-3">{t('legal.privacy.sections.logs.title')}</h2>
                        <p className="opacity-80">
                            {t('legal.privacy.sections.logs.text')}
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xs font-bold uppercase tracking-widest text-[#525252] mb-3">{t('legal.privacy.sections.cookies.title')}</h2>
                        <p className="opacity-80">
                            {t('legal.privacy.sections.cookies.text')}
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xs font-bold uppercase tracking-widest text-[#525252] mb-3">{t('legal.privacy.sections.thirdParty.title')}</h2>
                        <p className="opacity-80">
                            {t('legal.privacy.sections.thirdParty.text')}
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xs font-bold uppercase tracking-widest text-[#525252] mb-3">{t('legal.privacy.sections.contact.title')}</h2>
                        <p className="opacity-80">
                            {t('legal.privacy.sections.contact.text')}
                        </p>
                        <p className="mt-4 text-[#F5F5F5]">Kontakt: contact@liaora.com</p>
                    </section>

                </div>
            </div>
        </div>
    );
};

export default Privacy;
