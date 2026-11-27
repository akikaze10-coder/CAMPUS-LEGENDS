CAMPUS LEGENDS v0.255.0 emergency PWA recovery
Base: v0.254.0 (or already applied v0.253 assets).
Upload index.html, sw.js, recovery-v255.html to the same repository root. Do not remove existing media or save data.
Open https://akikaze10-coder.github.io/CAMPUS-LEGENDS/recovery-v255.html in the affected browser/profile after deployment, click the repair button, then open the game. For an installed PWA with separate storage, open the recovery URL in the same app context if possible.
The service worker installs the verified HTML and activates independently of the old UI. Media is filled asynchronously by the existing application.
