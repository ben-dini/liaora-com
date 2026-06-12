import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useLocale } from "../hooks/useLocale";

const sections = [
    {
        title: '1. Our Commitment',
        text: 'We stand behind every LIAORA Initiative product. If you experience a technical issue that prevents the software from functioning as described, we will work to resolve it or issue a refund.',
    },
    {
        title: '2. Eligibility — 14-Day Window',
        text: 'Refund requests are accepted within 14 days of purchase if:',
        list: [
            'The product does not function as described on the product page',
            'A critical technical issue cannot be resolved within a reasonable timeframe',
            'You were charged in error',
        ],
    },
    {
        title: '3. Non-Refundable Cases',
        text: 'Refunds are not issued for:',
        list: [
            'Change of mind after purchase',
            'Incompatibility with unsupported or outdated system versions',
            'License keys that have been activated and used',
            'THE OWNER tier after the 14-day refund window has passed',
            'Subscription renewals that were not cancelled in advance',
        ],
    },
    {
        title: '4. How to Request a Refund',
        text: 'Contact us at support@l1a1.software with:',
        list: [
            'Your order number (provided by Paddle in your purchase confirmation)',
            'A brief description of the issue',
        ],
        footer: 'We respond within 3 business days.',
    },
    {
        title: '5. Processing',
        text: 'Approved refunds are processed by Paddle.com Market Limited and typically appear within 5–10 business days depending on your payment method.\n\nContact: support@l1a1.software\nLast updated: March 2026',
    },
];

const Refund = () => {
    const navigate = useNavigate();
    const { locale } = useLocale();

    return (
        <div className="min-h-screen font-sans bg-[#0A0A0A] text-[#A3A3A3] p-6 md:p-12">
            <div className="max-w-2xl mx-auto mt-12 md:mt-20">
                <button
                    onClick={() => navigate(`/${locale}`)}
                    className="flex items-center gap-2 mb-12 text-xs uppercase tracking-widest hover:text-[#F5F5F5] transition-colors"
                >
                    <ArrowLeft className="w-3 h-3" /> Back
                </button>

                <h1 className="text-xl md:text-2xl font-light text-[#F5F5F5] mb-2">Refund Policy</h1>
                <p className="mb-12 opacity-50 text-xs uppercase tracking-widest">LIAORA Initiative · March 2026</p>

                <div className="space-y-10 text-sm leading-relaxed font-light">
                    {sections.map((section, i) => (
                        <section key={i}>
                            <h2 className="text-xs font-bold uppercase tracking-widest text-[#525252] mb-3">{section.title}</h2>
                            <p className="opacity-80 whitespace-pre-line">{section.text}</p>
                            {section.list && (
                                <ul className="mt-4 space-y-2 border-t border-white/5 pt-4">
                                    {section.list.map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-2 opacity-70">
                                            <span className="opacity-40 shrink-0">·</span> {item}
                                        </li>
                                    ))}
                                </ul>
                            )}
                            {'footer' in section && section.footer && (
                                <p className="mt-4 opacity-60 text-sm">{section.footer}</p>
                            )}
                        </section>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Refund;
