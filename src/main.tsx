import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "./App.tsx";
import Imprint from "./pages/Imprint.tsx";
import Privacy from "./pages/Privacy.tsx";
import Terms from "./pages/Terms.tsx";
import Refund from "./pages/Refund.tsx";
import { LocaleProvider } from "./contexts/LocaleContext.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
        <LocaleProvider>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/impressum" element={<Imprint />} />
                <Route path="/datenschutz" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/refund" element={<Refund />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </LocaleProvider>
    </BrowserRouter>
);
