import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useLocale } from "../hooks/useLocale";

const sections = [
    {
        title: '1. Acceptance of Terms',
        text: 'Use of any LIAORA Initiative product or service constitutes acceptance of these Terms & Conditions. If you do not agree, please do not use our products or services.',
    },
    {
        title: '2. License Grant',
        text: 'Upon purchase, you receive a non-transferable, non-exclusive license to use the software on your personal devices. License keys are issued per individual and may not be shared, resold, or redistributed.',
        list: [
            'Flex Pass — Weekly license, renewable',
            'Sovereign — Monthly license, full features',
            'Annual — 12-month license, all features',
            'THE OWNER — Perpetual license · V1–V5 (5 major updates) · Founder Badge',
        ],
    },
    {
        title: '3. Download & Installation',
        text: 'Software is distributed as official application packages. You are responsible for downloading only from official LIAORA sources. LIAORA Initiative is not responsible for versions obtained from third-party sources.',
    },
    {
        title: '4. Privacy & Local Processing',
        text: 'Our products operate entirely on your local device. No personal data, usage data, or media content is transmitted to external servers. All data remains on your machine. See our Privacy Policy for details.',
    },
    {
        title: '5. Payment & Billing',
        text: "All payments are processed by Paddle.com Market Limited, acting as Merchant of Record. By completing a purchase, you agree to Paddle's terms of service in addition to these terms. Refunds are handled per our Refund Policy.",
    },
    {
        title: '6. Intellectual Property',
        text: 'All software, design, branding, and code associated with LIAORA Initiative remain the intellectual property of Arben Hajdini / LIAORA Initiative. You may not copy, modify, reverse-engineer, or redistribute our products.',
    },
    {
        title: '7. Disclaimer of Warranties',
        text: 'Products are provided "as is" without warranty of any kind. LIAORA Initiative makes no guarantees regarding uptime, compatibility with all system versions, or fitness for a particular purpose.',
    },
    {
        title: '8. Limitation of Liability',
        text: 'To the maximum extent permitted by applicable law, LIAORA Initiative shall not be liable for any indirect, incidental, or consequential damages arising from use of our products.',
    },
    {
        title: '9. Governing Law',
        text: 'These terms are governed by the laws of the Federal Republic of Germany.',
    },
    {
        title: '10. Contact',
        text: 'Legal: legal@l1a1.software · Support: support@l1a1.software\n\nLast updated: March 2026',
    },
];

const Terms = () => {
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

                <h1 className="text-xl md:text-2xl font-light text-[#F5F5F5] mb-2">Terms & Conditions</h1>
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
                        </section>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Terms;
