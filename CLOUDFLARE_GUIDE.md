# Cloudflare Security Configuration Guide

The security report identified **"TLS/SSL Weak Cipher Suites"** and **"Reverse Proxy Detected"**.
Since your site uses Cloudflare, these settings are managed in your Cloudflare dashboard, not in your code.

## 1. Fix "TLS/SSL Weak Cipher Suites"

**Action Required:** Set Minimum TLS Version to 1.2.

1.  Log in to your **[Cloudflare Dashboard](https://dash.cloudflare.com/)**.
2.  Select your domain (`avelo.in`).
3.  Go to **SSL/TLS** > **Edge Certificates** in the sidebar.
4.  Scroll down to **Minimum TLS Version**.
5.  Change the setting to **TLS 1.2**.
    *   *Note: Using TLS 1.0 or 1.1 is considered insecure and allows weak ciphers.*

## 2. Review "Reverse Proxy Detected" & "WAF" (Informational)

**Status:** No Action Required (Expected Behavior).

*   **Reverse Proxy:** The report correctly identifies Cloudflare as a reverse proxy. This is how Cloudflare works to protect and accelerate your site.
*   **WAF (Web Application Firewall):** This means Cloudflare is actively protecting your site from attacks. This is a **good** thing.

## 3. Verify Changes

After changing the Minimum TLS Version in Cloudflare:
1.  Wait about 5-10 minutes for changes to propagate.
2.  You can use a tool like [SSLLabs Server Test](https://www.ssllabs.com/ssltest/) to scan `avelo.in` again.
3.  Verify that it reports an "A" or "A+" rating and that TLS 1.0 and 1.1 are "No".
