# Deployment: L1A1 Core Signal -> Strato

> **Status:** READY FOR RELEASE
> **Target:** Strato Webhosting
> **Artifact:** `apps/l1a1/dist`

Da dieses System (`l1a1.software`) ein "Single Build" aus dem Monorepo ist, folgen Sie dieser Anleitung für den Release.

## 1. Build Generieren (Lokal)
Führen Sie diese Befehle in Ihrem Terminal (im Root des Repos) aus:

```bash
# 1. In das Projekt-Verzeichnis wechseln
# (Passen Sie den Pfad ggf. an, falls Ihr Ordner anders liegt)
cd ~/liaora-ai-hub/liaora-ai-hub/apps/l1a1

# 2. Dependencies installieren (falls noch nicht geschehen)
npm install

# 3. Production Build starten
npm run build
```

Dies erzeugt einen Ordner `dist`. 
**Dieser Ordner enthält Ihre komplette Website.**

## 2. Upload zu Strato (SFTP)
1.  Verbinden Sie sich via FileZilla / Cyberduck mit Ihrem Strato-Hosting.
2.  Navigieren Sie in den Ordner, auf den Ihre Domain `l1a1.software` zeigt.
3.  **Löschen** Sie alle bestehenden Inhalte in diesem Ordner.
4.  Laden Sie den **Inhalt** des lokalen `dist`-Ordners hoch (HTML, CSS, Assets).
    *   *Hinweis: Laden Sie nicht den Ordner 'dist' selbst hoch, sondern dessen Inhalt.*

## 3. Verifizierung (Checklist)
Nach dem Upload, öffnen Sie `https://l1a1.software`.

*   [ ] **Signal Check:** Erscheint "SYSTEM ONLINE"?
*   [ ] **Dark Mode:** Ist alles tiefschwarz (kein Weiß)?
*   [ ] **SSL Check:** Hat der Browser-Tab das Icon (Blauer Pixel)?
*   [ ] **Social Check:** Teilen Sie den Link in Slack/Discord/WhatsApp. Erscheint die "L1A1 CORE" Karte?

## 4. Troubleshooting: Domain im falschen Paket?
Falls die Domain `l1a1.software` im SSL-Menü fehlt:
1.  Prüfen Sie, ob sie in einem "Domain-Paket" liegt (anderer Auftrag).
2.  Gehen Sie in das Domain-Paket -> Domainverwaltung.
3.  Nutzen Sie **"Domain umziehen"** (intern), um sie in das Hosting-Paket zu schieben.
    *   *Achtung:* Nicht "Neu bestellen" (da sie schon Ihnen gehört), sondern aus dem alten Paket "verschieben".

## Notfall-Plan C (Falls Umzug scheitert)
Falls Strato den Umzug verweigert:
1.  Gehen Sie in das **Domain-Paket** -> "Datenbanken & Webspace" (falls vorhanden).
2.  Laden Sie die Website **auch dort** hoch.
3.  Setzen Sie die Domain `l1a1.software` intern auf den Ordner.
    *   *Problem:* Domain-Pakete haben oft kein SSL und keinen Webspace.
    *   *Lösung:* Der Umzug ist zwingend. Suchen Sie im Strato-FAQ nach "Domain intern umziehen".

---
*System End of Line.*
