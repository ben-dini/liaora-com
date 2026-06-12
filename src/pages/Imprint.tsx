import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useLocale } from "../hooks/useLocale";

const Imprint = () => {
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

                <h1 className="text-xl md:text-2xl font-light text-[#F5F5F5] mb-8">{t('legal.imprint.title')}</h1>

                <div className="space-y-8 text-sm leading-relaxed font-light">
                    <section>
                        <h2 className="text-xs font-bold uppercase tracking-widest text-[#525252] mb-4">{t('legal.imprint.tmg')}</h2>
                        <p>
                            Arben Hajdini<br />
                            Rosengarten 3<br />
                            22880 Wedel<br />
                            Schleswig-Holstein<br />
                            Germany
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xs font-bold uppercase tracking-widest text-[#525252] mb-4">{t('legal.imprint.contact')}</h2>
                        <p>
                            E-Mail: contact@liaora.com
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xs font-bold uppercase tracking-widest text-[#525252] mb-4">{t('legal.imprint.liability.title')}</h2>
                        <p className="opacity-80">
                            {t('legal.imprint.liability.text')}
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xs font-bold uppercase tracking-widest text-[#525252] mb-4">{t('legal.imprint.copyright.title')}</h2>
                        <p className="opacity-80">
                            {t('legal.imprint.copyright.text')}
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Imprint;
