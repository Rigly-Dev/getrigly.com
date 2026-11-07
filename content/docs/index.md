---
title: Introduction
nav: Introduction
description: What Rigly is, what it does, and how to get started.
---
Rigly is a local PHP development environment for macOS. It serves the projects on your Mac at addresses like `shop.test`, with the PHP version, databases and tools each one needs, from a native menu bar app and a `rigly` command.

## What Rigly does

- **Serves your sites.** Park a folder and every project inside it gets its own address. Laravel, WordPress, Symfony, plain PHP and static sites are detected automatically. [Sites](/docs/sites/)
- **HTTPS with one switch**, using a certificate authority on your Mac that browsers trust. [HTTPS](/docs/https/)
- **Every PHP version** from 7.4 to 8.5, with a default and per-site versions, php.ini settings, Xdebug, PCOV and SPX. [PHP](/docs/php/)
- **Node** through nvm, with per-site versions and `.nvmrc` support. [Node](/docs/node/)
- **Services:** MySQL, PostgreSQL, MariaDB, Redis, MongoDB, Meilisearch, Typesense and MinIO. [Services](/docs/services/)
- **A mail catcher, dumps and Insights**, so you can see what your app sends and does. [Mail](/docs/mail/) · [Insights](/docs/insights/)
- **Public sharing** through TunnelPad, with a request inspector. [Sharing](/docs/sharing/)
- **Workspaces:** a second copy of a site on its own git branch and database. [Workspaces](/docs/workspaces/)

## How it works

Rigly runs a small background service that looks after:

- **[Caddy](https://caddyserver.com)**, the web server, which answers for every site and handles HTTPS;
- **PHP-FPM**, one pool for each PHP version your sites use;
- **a DNS responder**, which answers `*.test` with your Mac's address. macOS sends those lookups to it, and nothing else.

It also runs the databases and tools you add. Everything lives in `~/Library/Application Support/Rigly`. Rigly doesn't use Homebrew, Docker or the PHP that comes with your Mac, and leaves them alone.

The menu bar app and the `rigly` command share the same settings, so you can use either, or both.

## Requirements

- macOS 15 Sequoia or later
- A Mac with Apple silicon or an Intel processor
- About 200 MB of disk space for the basics, plus whatever PHP versions and services you add

## Quick start

1. [Download Rigly]({{download}}), open the disk image and drag Rigly to Applications.
2. Open Rigly and click **Install**. macOS asks for your password once, so Rigly can route `.test` addresses to your Mac.
3. Click **Park folder** and choose the folder that holds your projects, such as `~/Code`.
4. Open `http://<project>.test` in your browser.

The [installation guide](/docs/installation/) covers each step in detail.
