# Deployment Fix für MIME-Type Probleme

## Problem
```
Laden des Moduls wurde auf Grund eines nicht freigegebenen MIME-Typs ("text/html") blockiert.
```

## Lösung

### 1. Automatisches Deployment (.htaccess im dist/)
- Die `.htaccess` Datei wird automatisch beim Build ins `dist/` Verzeichnis kopiert
- GitHub Actions deployed diese automatisch mit

### 2. Manuelle Server-Konfiguration
Falls die automatische Lösung nicht funktioniert, kopiere den Inhalt von `htaccess-server.txt` in eine `.htaccess` Datei im `/clock/` Verzeichnis auf dem Server.

### 3. Server-Root .htaccess
Die `.htaccess` Datei im Projektroot kann auch in das Server-Root-Verzeichnis kopiert werden.

## Wichtige MIME-Types
```apache
AddType application/javascript .js
AddType application/javascript .mjs
AddType text/css .css
```

## Test
Nach dem Deployment sollten die JavaScript-Module korrekt mit `Content-Type: application/javascript` ausgeliefert werden.

## Deployment-Workflow
1. Code ändern
2. `npm run build` (lokales Testing)
3. Push zu GitHub → Automatisches Deployment via GitHub Actions
4. .htaccess wird automatisch mit deployed

## Troubleshooting
- Prüfe Netzwerk-Tab in Browser DevTools
- Response Header `Content-Type` sollte `application/javascript` sein
- Falls weiterhin Probleme: Server-Admin kontaktieren für Apache-Konfiguration
