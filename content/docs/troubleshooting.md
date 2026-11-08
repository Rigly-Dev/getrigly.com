---
title: Troubleshooting
description: Checks, logs and fixes for when a site doesn't load.
---
Most problems show up in Rigly's checks. On Windows, the checks are Rigly's DNS rule and its trusted certificate, and the rest of this page applies as on the Mac: see [Rigly for Windows](/docs/windows/) for what's different there.

Most problems show up in Rigly's checks. Open **Settings** to see them, or run:

```sh
rigly doctor
```

If anything needs attention, click **Fix** in Settings. It repairs the system setup without asking for your password again.

## What each check means

| Check | If it fails |
| --- | --- |
| Background service | Rigly's service isn't running. Click **Restart** in the sidebar, or run `rigly restart`. |
| Web server (Caddy) | Caddy didn't start. Its log usually says why: `rigly logs caddy`. |
| DNS | Rigly's DNS responder isn't answering. Restart Rigly. |
| DNS resolver | macOS isn't sending `.test` lookups to Rigly. Click **Fix**. |
| Loopback alias | The `127.0.0.2` address is missing (only when Rigly runs next to another tool). Click **Fix**. |
| Port forwarding | Ports 80 and 443 aren't reaching Rigly. Click **Fix**. |
| Local CA trusted | Browsers don't trust Rigly's HTTPS certificate yet. Click **Fix**, or run `rigly trust`. |

## A site doesn't load

- **"Server not found":** check the DNS resolver check passes, then flush the DNS cache with `sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder`. A VPN can take over DNS; try with it off.
- **The wrong site, or another tool's page:** something else is answering on port 80. See [your domain](/docs/installation/#your-domain-test-or-rig).
- **404 or a directory listing:** Rigly is serving the wrong folder. Check the site's web root with `rigly root`, and set it with `rigly root public`.
- **"502 Bad Gateway":** PHP isn't running for that site's version. Check `rigly status`, and the PHP log with `rigly logs php8.4-fpm`.
- **A PHP error:** check the app's own logs. For Laravel, `rigly log` shows the newest entries.

## Certificate warnings

If a browser warns about an HTTPS site:

1. Check **Local CA trusted** passes in Settings. If not, click **Fix** and enter your password when macOS asks.
2. Quit and reopen the browser; some only read trust settings when they start.
3. Make sure you're using `https://` and the site's HTTPS switch is on.

## Logs

The **Logs** window shows Rigly's, Caddy's, PHP's and each service's logs. From the command line:

```sh
rigly logs              # Rigly's own log
rigly logs caddy -f     # follow Caddy's log
rigly logs php8.3-fpm
rigly logs mysql
```

## Start again

To reset Rigly completely and install it fresh, follow [Uninstalling](/docs/updates-and-uninstalling/#uninstalling), then install it again. Back up any local databases you need first.
