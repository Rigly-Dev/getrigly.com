---
title: Installation
description: Download and install Rigly, what first-time setup does, and running Rigly alongside Laravel Herd or Valet.
---
Rigly comes as a disk image signed and notarized by Apple. Installing takes a minute or two, most of it downloading PHP.

This page covers the Mac. On Windows, see [Rigly for Windows](/docs/windows/).

## Install the app

1. [Download Rigly]({{download}}).
2. Open `Rigly.dmg` and drag **Rigly** to **Applications**.
3. Open Rigly from Applications, Launchpad or Spotlight.

Rigly lives in your menu bar. The first time you open it, its window shows a welcome screen.

## First-time setup

Click **Install**. Rigly then:

1. **Asks for your password, once.** macOS shows an "Install Helper" prompt. Rigly installs a small helper that sets up the system parts:
   - a resolver file, so macOS asks Rigly about `.test` addresses;
   - forwarding of ports 80 and 443 to Rigly's web server, so sites work without port numbers.
   The helper is what lets Rigly change these later, from Settings, without asking again.
2. **Downloads Caddy and PHP 8.4** (about 80 MB) into `~/Library/Application Support/Rigly`, and adds Rigly's commands to your PATH.
3. **Starts its background service**, and waits until everything is up before showing the main window.

If you click **Don't Allow**, nothing is changed and you're back at the Install button.

Rigly also installs some developer tools in the background: Composer, Node (the current LTS, through nvm) and the Laravel installer.

## Your domain: .test or .rig

Rigly normally serves sites at `.test` on `127.0.0.1`, like most PHP tools.

If you already have something serving local sites, Rigly uses **`.rig` on `127.0.0.2`** instead, so the two run side by side without clashing. The welcome screen tells you when this happens. Rigly does this when it finds:

- Laravel Herd or Laravel Valet;
- a web server already running on port 80 or 443 (MAMP, Homebrew nginx or Apache, Docker…);
- another tool already handling `.test` (an `/etc/resolver/test` file).

The choice is made once, on first install, and kept. Throughout these docs, `.test` means whichever domain your Rigly uses. To choose your own from the command line, see [`rigly setup`](/docs/cli/#setup-and-the-service).

## The rigly command in Terminal

Setup also puts Rigly's commands on your PATH, so you can use them in Terminal: `rigly`, and the `php`, `composer`, `node`, `npm` and other commands that use each site's versions. Rigly adds one line to your shell's startup file: `~/.zshrc` for zsh (macOS's default), `~/.bash_profile` for bash, or `~/.config/fish/conf.d/rigly.fish` for fish.

Open a new Terminal window after installing, then check it works:

```sh
rigly status
```

If you'd rather add it yourself, **Settings** shows the line to use.

## Start at login

Rigly's background service keeps running when you quit the app, and starts again when you log in. To have the menu bar icon come back at login too, turn on **Open Rigly at login** in Settings. When Rigly starts at login it stays in the menu bar; opening it from Applications shows its window.

## Check everything is working

**Settings** shows a list of checks: the background service, the web server, DNS, the resolver, port forwarding and HTTPS. If any need attention, click **Fix**. From the command line:

```sh
rigly doctor
```
