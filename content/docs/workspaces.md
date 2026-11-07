---
title: Workspaces
description: A second copy of a site on its own git branch, address and database.
---
A workspace is a second copy of a site, so you can work on a branch while the original keeps running. Each workspace has its own folder, git branch, address and, if you like, database.

## Create a workspace

In the app, select a site and click **New** in its **Workspaces** card. From the command line, in the site's folder:

```sh
rigly workspace feature-auth
```

That creates `feature-auth.shop.test`:

- **The code** is a git worktree on a new branch called `feature-auth`. Files git ignores, such as `.env`, `vendor` and `node_modules`, are copied too. The copies take almost no extra disk space until they change. A project that isn't a git repository is copied in full.
- **The settings** match the original: PHP version, Node version and HTTPS.
- **Laravel apps** get `APP_URL` and `DB_DATABASE` updated, and their cached config cleared.

## Databases

Choose what the workspace's database should be:

| Option | |
| --- | --- |
| `--database clone` | A copy of the site's database (the default). Works for MySQL, MariaDB, PostgreSQL and SQLite. |
| `--database empty` | A new, empty database. Laravel apps are migrated. |
| `--database shared` | Use the same database as the site. |

## List and remove workspaces

```sh
rigly workspaces
rigly workspace:remove feature-auth
rigly workspace:remove feature-auth --keep-database
```

Removing a workspace deletes its folder, including any changes you haven't committed, and its database. The git branch is kept, so your commits are safe.
