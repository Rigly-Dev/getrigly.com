---
title: Sharing
description: Give any site a public HTTPS address with TunnelPad, protect it, and inspect every request.
---
Sharing gives a site a public HTTPS address, like `https://shop-k2x9.tunnelpad.dev`, so clients, phones and webhooks can reach it. It goes through [TunnelPad](https://tunnelpad.com), which has free accounts.

## Sign in

Open **Settings → Sharing** and click **Sign in with TunnelPad**. Your browser opens; approve the code it shows, and you're signed in. Or paste a token from your TunnelPad account. From the command line:

```sh
rigly share:token <token>
```

The token is saved in `~/.tunnelpad`, and also used by the `tunnelpad` command if you have it.

## Share a site

In the app, open a site's **Share publicly** card and click **Share**. From the command line:

```sh
cd ~/Code/shop
rigly share
rigly share --subdomain acme-shop     # choose the name (Pro and Team plans)
```

The site stays shared, and reconnects by itself, until you stop it:

```sh
rigly shares            # everything shared, with its address
rigly unshare shop
rigly unshare --all
```

On the free plan you get a random name and the share closes after 90 minutes. A site keeps its name each time you share it.

## Your app sees HTTPS

Visitors reach your site over HTTPS, and Rigly tells your app so: Laravel, WordPress and others build `https://…tunnelpad.dev` links without any trusted-proxy settings.

## Protect a share

In the Share card, choose who can open the site:

- **Anyone with the link**;
- **Password protected**: visitors enter a username and password you choose;
- **Email sign-in**: visitors enter their email address first. You can limit it to addresses or domains, like `@company.com`. Addresses aren't verified, so it keeps out casual visitors rather than determined ones.

## Inspect requests

Click **Inspect requests…** in the Share card to open the **Requests** window. It shows every request the share receives, with headers and bodies. Replay a request to test a fix, or copy it as a cURL command. It's ideal for webhooks.
