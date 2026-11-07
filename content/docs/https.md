---
title: HTTPS
description: Serve sites over HTTPS with a certificate your browsers trust.
---
Rigly can serve any site over HTTPS, at `https://shop.test`, with a certificate your browsers accept without warnings.

## Turn HTTPS on

In the app, turn on the **HTTPS** switch for a site. From the command line:

```sh
rigly secure            # the current folder's site
rigly secure shop
rigly unsecure shop     # back to plain HTTP
```

You can also turn it on when you create a site: `rigly link --secure`, `rigly proxy … --secure`, or the HTTPS option in **New site**.

## Trusting Rigly's certificate

Rigly makes its own certificate authority on your Mac and uses it to issue a certificate for each site. For browsers to accept those certificates, macOS has to trust Rigly's authority. That needs your password, and macOS always asks for it in its own prompt.

So the first time you turn HTTPS on for a site, Rigly explains this and then macOS asks. You only do this once; every HTTPS site after that just works. If you'd rather not yet, click **Not Now**: the site still works over HTTPS, but browsers show a warning until you trust the certificate.

To trust it later, click **Fix** in Settings, or run:

```sh
rigly trust
```

Run `rigly trust` without `sudo`: macOS needs to ask you itself.

If a browser still warns after you've trusted the certificate, quit and reopen the browser. Firefox uses the macOS trust settings automatically on recent versions; if it doesn't, enable `security.enterprise_roots.enabled` in `about:config`.

## Where the certificate lives

The certificate authority is in `~/Library/Application Support/Rigly`, and only exists on your Mac. Its certificate is called **Rigly Local CA Root** in Keychain Access. It's only ever used for your local sites.

## Apps behind HTTPS

Rigly tells PHP the request is secure (`HTTPS=on`, port 443), so frameworks build `https://` URLs without any proxy settings. For Laravel, set `APP_URL` to the `https://` address.
