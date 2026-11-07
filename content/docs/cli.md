---
title: CLI reference
description: Every rigly command.
---
Everything in the app is also a `rigly` command, and both share the same settings. Commands that act on a site use the site for the current folder unless you name one. Run `rigly help <command>` for every option.

To use `rigly` in Terminal, put Rigly's `bin` folder on your PATH. See [Installation](/docs/installation/#the-rigly-command-in-terminal).

## Setup and the service

| Command | |
| --- | --- |
| `rigly setup` | Install Rigly's binaries and background service. Options: `--tld`, `--loopback`, `--http-port`, `--https-port`, `--php`, `--no-start` |
| `rigly start` · `stop` · `restart` | Control the background service |
| `rigly status` | Show what's running |
| `rigly doctor` | Check the installation for problems |
| `rigly trust` | Trust Rigly's certificate for HTTPS. Run it without `sudo` |
| `rigly logs [name] [-f]` | Show service logs: `rigly`, `caddy`, `php8.4-fpm`, or a service's id |

## Sites

| Command | |
| --- | --- |
| `rigly park [path]` · `unpark` · `parked` | Serve every folder inside a directory |
| `rigly link [name]` | Serve a folder as `<name>.test`. Options: `--path`, `--secure`, `--php` |
| `rigly unlink` | Remove a link |
| `rigly sites` | List all sites |
| `rigly which` | Show which site serves the current folder |
| `rigly open [name]` | Open a site in your browser |
| `rigly secure` · `unsecure` | Serve a site over HTTPS, or plain HTTP |
| `rigly root [path]` | Show or set the folder a site serves. `--reset` to detect it again |
| `rigly proxy <name> <target>` · `unproxy` | Serve a local server (a port or URL) at `<name>.test` |
| `rigly alias <name>` · `unalias` | Serve a site at another name too |
| `rigly init` | Set up a project from its `rigly.yml`. `--save` writes one |
| `rigly log` | Show a Laravel site's newest log entries |
| `rigly new laravel <name>` | Create a Laravel app. Options: `--kit`, `--php`, `--secure`, `--path`, `--no-npm`, `--no-git` |
| `rigly new wordpress <name>` | Create a WordPress site. Options: `--title`, `--admin-user`, `--admin-email`, `--mysql`, `--php`, `--secure`, `--path` |

## PHP

| Command | |
| --- | --- |
| `rigly php:list` | List PHP versions |
| `rigly php:install <version>` | Install a version |
| `rigly php:update` | Update installed versions to Rigly's latest builds |
| `rigly php:uninstall <version>` | Remove a version |
| `rigly use <version>` | Set the default version |
| `rigly isolate <version>` · `unisolate` | Pin a site to a version, or return it to the default |
| `rigly php:set [key] [value]` | Show or change `memory_limit`, `upload_max_filesize`, `max_execution_time` |
| `rigly ext:list` | List a version's extensions |
| `rigly ext:on <name>` · `ext:off` | Turn `xdebug`, `pcov` or `spx` on or off. `--php` for another version |
| `rigly php …` | Run PHP for the current site (what the `php` command calls) |

## Node

| Command | |
| --- | --- |
| `rigly node:list` | List installed versions |
| `rigly node:install [version]` | Install a version (default: the current LTS) |
| `rigly node:uninstall <version>` | Remove a version |
| `rigly node:use <version>` | Set the default version |
| `rigly node:isolate <version>` · `node:unisolate` | Pin a site to a version, or let it use its `.nvmrc` |
| `rigly tools:install` | Install or repair Composer, Node and the Laravel installer |

## Services and databases

| Command | |
| --- | --- |
| `rigly services` | List services |
| `rigly service:add <kind>` | Add `mysql`, `postgres`, `redis`, `meilisearch`, `typesense`, `mongodb`, `mariadb` or `minio`. Options: `--version`, `--port` |
| `rigly service:start` · `service:stop` | Start or stop a service |
| `rigly service:remove <id>` | Remove a service. `--delete-data` deletes its data too |
| `rigly db:list` | List databases |
| `rigly db:create <name>` · `db:drop <name>` | Create or drop a database. `--service` to choose the service |

## Workspaces

| Command | |
| --- | --- |
| `rigly workspace <name>` | Create a workspace. Options: `--database clone\|empty\|shared`, `--site` |
| `rigly workspaces` | List workspaces |
| `rigly workspace:remove <name>` | Delete a workspace. `--keep-database` keeps its database |

## Sharing

| Command | |
| --- | --- |
| `rigly share:token <token>` | Save your TunnelPad token |
| `rigly share [name]` | Share a site publicly. `--subdomain` to choose the name |
| `rigly unshare [name]` | Stop sharing. `--all` for every site |
| `rigly shares` | List shared sites |

## Mail and dumps

| Command | |
| --- | --- |
| `rigly mail` · `mail:clear` | List or delete caught mail |
| `rigly dumps:on` · `dumps:off` | Send `dump()`/`dd()` to Insights, or back to the page |
| `rigly dumps:clear` | Delete captured dumps |
