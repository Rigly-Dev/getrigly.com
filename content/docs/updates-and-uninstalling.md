---
title: Updates and uninstalling
nav: Updates & uninstalling
description: How Rigly keeps itself up to date, and how to remove it completely.
---
Rigly checks for updates once a day and installs them for you. To check straight away, choose **Check for Updates…** in Rigly's menu bar menu.

This page covers the Mac. On Windows, see [updates](/docs/windows/#updates) and [uninstalling](/docs/windows/#uninstalling) in Rigly for Windows.

## Updates

Updates are signed: Rigly only installs an update signed with Rigly's own key, and macOS checks Apple's notarization as well. Your sites, settings, PHP versions and databases are kept.

The PHP versions Rigly installs are updated separately, so you choose when:

```sh
rigly php:update
```

The **PHP** page in the app shows an **Update** button when a newer build of an installed version is available.

## Uninstalling

Rigly keeps nearly everything in one folder, but setup also changes a few system settings. To remove Rigly completely:

1. **Stop Rigly.** Quit the app from its menu, then stop the background service:

   ```sh
   launchctl bootout gui/$(id -u)/dev.rigly.daemon
   rm ~/Library/LaunchAgents/dev.rigly.daemon.plist
   ```

2. **Undo the system setup.** These need your password:

   ```sh
   sudo launchctl bootout system/dev.rigly.network
   sudo launchctl bootout system/dev.rigly.helper
   sudo rm -f /Library/LaunchDaemons/dev.rigly.network.plist /Library/LaunchDaemons/dev.rigly.helper.plist
   sudo rm -f /Library/PrivilegedHelperTools/dev.rigly.helper
   sudo pfctl -a com.apple/rigly -F all
   sudo rm -f /etc/resolver/test    # or /etc/resolver/rig
   ```

   If Rigly uses `127.0.0.2`, also run `sudo ifconfig lo0 -alias 127.0.0.2`.

3. **Remove the certificate**, if you used HTTPS: open **Keychain Access**, find **Rigly Local CA Root** in the login or System keychain, and delete it.

4. **Delete Rigly's files.** This deletes your local databases, caught mail and installed PHP versions. Your projects aren't touched.

   ```sh
   rm -rf ~/Library/Application\ Support/Rigly
   defaults delete dev.rigly.app
   ```

5. Remove Rigly's PATH line from `~/.zshrc` (or `~/.bash_profile`, or delete `~/.config/fish/conf.d/rigly.fish`), and drag Rigly from Applications to the Bin.
