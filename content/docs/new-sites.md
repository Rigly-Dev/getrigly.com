---
title: New sites
description: Create a new Laravel app or WordPress site, served as soon as it's ready.
---
Rigly can create a new Laravel app or WordPress site for you, install everything it needs, and serve it.

New projects go in your first parked folder, so they're served straight away. If you haven't parked a folder, choose where to put them, and Rigly links the new site.

## Laravel

In the app, choose **New site → Laravel…**. Choose a name, a starter kit and a PHP version. From the command line:

```sh
rigly new laravel shop
rigly new laravel shop --kit livewire --php 8.4 --secure
```

| Option | |
| --- | --- |
| `--kit react\|vue\|livewire` | Start from one of Laravel's official starter kits |
| `--php 8.4` | Pin the site to a PHP version |
| `--secure` | Serve it over HTTPS |
| `--path ~/Sites` | Create it somewhere other than your first parked folder |
| `--no-npm` | Skip `npm install` and building assets |
| `--no-git` | Don't start a git repository |

Rigly runs `composer create-project`, sets `APP_URL` to the site's address, installs and builds the front-end assets with npm, and starts a git repository with a first commit.

## WordPress

In the app, choose **New site → WordPress…**. From the command line:

```sh
rigly new wordpress blog --title "My Blog"
```

Rigly downloads WordPress, creates its database, writes `wp-config.php` and runs the installer, then shows you the admin address, username and password.

WordPress needs MySQL. By default it uses Rigly's MySQL on `127.0.0.1:3306`, so [add MySQL](/docs/services/) first if you haven't. To use another server, pass `--mysql host:port --mysql-user … --mysql-password …`. Other options: `--admin-user`, `--admin-email`, `--php`, `--secure` and `--path`.

WP-CLI is installed automatically and available as `wp`.
