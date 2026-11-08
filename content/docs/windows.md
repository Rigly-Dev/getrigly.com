---
title: Rigly for Windows
nav: Windows
description: Install Rigly on Windows, what setup does there, how it differs from the Mac, and how to update and uninstall it.
---
Rigly for Windows is in beta. It's the same Rigly as on the Mac: the same `rigly` command, the same settings, and an app with the same pages, living in the system tray instead of the menu bar. The rest of these docs apply to Windows too. This page covers what's different.

## Requirements

- Windows 10 or Windows 11, 64-bit, on an Intel or AMD processor
- About 200 MB of disk space for the basics, plus whatever PHP versions and services you add
- An account that can approve an administrator prompt once, during setup

## Install the app

1. [Download Rigly for Windows]({{downloadWindows}}). You get `RiglyApp-win-Setup.exe`.
2. Open it. Rigly installs for your account only, with no administrator prompt, and adds shortcuts to the Start menu and your desktop.

Rigly's installer isn't code-signed yet, so Windows may stop it with **Windows protected your PC**. Click **More info**, then **Run anyway**. Your browser may also ask you to confirm the download.

## First-time setup

Rigly opens with a welcome screen. Click **Set up Rigly**. Rigly then:

1. **Downloads Caddy and PHP 8.4** into `%LOCALAPPDATA%\Rigly`, along with Composer and certificates for HTTPS.
2. **Asks for administrator approval, once.** Windows shows a prompt so Rigly can add a DNS rule, which sends `.test` lookups to Rigly and nothing else. It's the only change outside your account.
3. **Adds Rigly's commands to your Path**, starts its background service, and sets it to start when you sign in.
4. **Parks a folder for your projects**, `%USERPROFILE%\Rigly`. If you use Laravel Herd or Valet, it also parks their folders, so your existing sites work straight away.

Rigly also installs Node (the current LTS) and the Laravel installer in the background.

If you decline the administrator prompt, Rigly still installs, but `.test` addresses won't work until you add the rule. Settings shows the problem and a **Fix…** button that asks again.

## Your domain: .test or .rig

As on the Mac, Rigly serves sites at `.test` on `127.0.0.1`. If it finds Laravel Herd or Valet, a web server already using port 80 or 443, or another tool handling `.test` addresses, it uses **`.rig` on `127.0.0.2`** instead, so both run side by side. The choice is made on first setup and kept. See [Installation](/docs/installation/#your-domain-test-or-rig) for more.

## The system tray

Rigly's icon lives in the system tray, at the right of the taskbar. Click it to open Rigly's window. Right-click it for a menu of your sites, **New Site…**, the Mail, Insights, Logs and Requests tools, your default PHP and Node versions, starting and stopping Rigly, **Send Feedback (Beta)** and **Quit Rigly**.

Closing the window keeps Rigly in the tray. Quitting the app doesn't stop your sites: the background service keeps running and starts again when you sign in. To have the tray icon come back at sign-in too, turn on **Open Rigly at sign-in** in Settings.

## The rigly command

Setup puts Rigly's `bin` folder first in your Path, so `rigly`, `php`, `composer`, `node`, `npm` and `npx` work in PowerShell, Command Prompt and Windows Terminal, using each project's versions. Open a new terminal window after setup, then check it works:

```powershell
rigly status
```

## HTTPS

The first time a site uses HTTPS, Rigly asks Windows to trust its certificate authority, and Windows shows a **Security Warning** asking you to confirm installing **Rigly Local CA Root**. Click **Yes**. Chrome and Edge use Windows' trusted certificates. If Firefox doesn't trust your sites, turn on `security.enterprise_roots.enabled` in `about:config`. See [HTTPS](/docs/https/).

## What's different from the Mac

- **Services:** everything except Typesense, which isn't available on Windows yet. Redis is Valkey, an open-source Redis, which works with every Redis client.
- **PHP:** the same versions, 7.4 to 8.5, with Xdebug and PCOV. The SPX profiler is Mac-only for now.
- **Files:** Rigly keeps everything in `%LOCALAPPDATA%\Rigly` (on the Mac, `~/Library/Application Support/Rigly`).
- **Keyboard shortcuts** use Ctrl where the Mac uses ⌘. **Ctrl+K** opens Jump to.

## Updates

Rigly checks for updates when it starts and once a day, and downloads them in the background. When an update is ready, **Settings** shows **Restart to update**. To check straight away, click **Check for Updates…** in Settings. Your sites, settings, PHP versions and databases are kept.

## Uninstalling

1. **Stop Rigly** in a terminal: `rigly stop`. Then right-click the tray icon and choose **Quit Rigly**.
2. **Uninstall the app** from **Settings › Apps › Installed apps**: find **Rigly**, then **Uninstall**.
3. **Remove what setup added.** In PowerShell:

   ```powershell
   Remove-ItemProperty HKCU:\Software\Microsoft\Windows\CurrentVersion\Run -Name Rigly -ErrorAction SilentlyContinue
   Get-ChildItem Cert:\CurrentUser\Root | Where-Object Subject -like '*Rigly Local CA*' | Remove-Item
   ```

   Then, in PowerShell **run as administrator**, remove the DNS rule:

   ```powershell
   Get-DnsClientNrptRule | Where-Object Comment -eq 'Rigly' | ForEach-Object { Remove-DnsClientNrptRule -Name $_.Name -Force }
   ```

4. **Remove Rigly from your Path:** search the Start menu for **Edit environment variables for your account**, select **Path**, click **Edit**, and remove the entry ending in `\Rigly\bin`.
5. **Delete Rigly's files**, `%LOCALAPPDATA%\Rigly`. This deletes your local databases, caught mail and installed PHP versions. Your projects, including those in `%USERPROFILE%\Rigly`, aren't touched.

## Feedback

Bug reports and ideas for Windows go to [Rigly for Windows' issue tracker](https://github.com/Rigly-Dev/rigly-windows/issues). The quickest way is from Rigly: right-click the tray icon and choose **Send Feedback (Beta)**, or click the **Beta** badge in Rigly's window. Rigly fills in your Rigly and Windows versions for you. See [Beta and feedback](/docs/beta/).
