---
title: Databases
description: Create, list and drop databases on Rigly's MySQL, MariaDB and PostgreSQL.
---
Rigly manages databases on its MySQL, MariaDB and PostgreSQL services, from the app's Services page or the command line.

## Create and drop databases

```sh
rigly db:list
rigly db:create shop
rigly db:drop shop
```

These use your first database service. Add `--service <id>` to use another, such as `--service postgres`. `rigly services` shows each service's id.

## Connect from your app

For Laravel, point `.env` at the service:

```sh
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=shop
DB_USERNAME=root
DB_PASSWORD=
```

For PostgreSQL use `DB_CONNECTION=pgsql`, port 5432 and the user `postgres`, with no password.

## Connect with a database app

TablePlus, Sequel Ace, DBeaver and other database apps connect to `127.0.0.1` on the service's port. MySQL and MariaDB use the user `root`, PostgreSQL the user `postgres`, both with no password.

## Copies for workspaces

[Workspaces](/docs/workspaces/) can clone a site's database, so you can try a migration on a copy.
