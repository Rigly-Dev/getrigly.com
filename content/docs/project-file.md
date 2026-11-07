---
title: rigly.yml
description: Commit a project's Rigly settings so teammates get the same setup with rigly init.
---
`rigly.yml` keeps a project's Rigly settings with its code. Commit it, and a teammate can clone the project and run `rigly init` to get the same site name, PHP and Node versions, HTTPS, domains and services.

## The file

```yaml
name: shop
php: 8.3
node: 22
secure: true
root: public
aliases: [admin-shop]
services: [mysql, redis]
```

| Key | |
| --- | --- |
| `name` | The site's name, so `shop.test` |
| `php` | PHP version for this site |
| `node` | Node major version for this site |
| `secure` | `true` to serve it over HTTPS |
| `root` | The folder to serve, relative to the project |
| `aliases` | Extra names the site also answers to |
| `services` | Services the project needs: `mysql`, or a version such as `mysql:8.4` |

Every key is optional. Lists can be written inline (`[a, b]`) or one per line (`- a`).

## Apply it

```sh
cd ~/Code/shop
rigly init
```

Rigly links the project under its name, installs the PHP and Node versions if needed, turns on HTTPS and adds any missing services.

## Write one from your current settings

```sh
rigly init --save            # writes rigly.yml for the current site
rigly init --save --force    # replaces an existing one
```
