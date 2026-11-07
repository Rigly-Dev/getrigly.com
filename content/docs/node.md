---
title: Node
description: Node versions through nvm, a default version, per-site versions and .nvmrc support.
---
Rigly installs Node through [nvm](https://github.com/nvm-sh/nvm) and runs the right version for each project, so `npm run dev` just works.

## Versions

Rigly installs the current Node LTS during setup. The **Node** page in the app lists versions and installs others. From the command line:

```sh
rigly node:list
rigly node:install 22       # or 22.11.0, or lts/*
rigly node:use 24           # the default version
rigly node:uninstall 20
```

## Which version a project uses

Rigly's `node`, `npm`, `npx` and `nvm` commands pick a version in this order:

1. the version the site is pinned to in Rigly;
2. the nearest `.nvmrc` file in the project;
3. the default version.

To pin a site:

```sh
cd ~/Code/shop
rigly node:isolate 22
rigly node:unisolate        # use its .nvmrc or the default again
```

## Vite

Run Vite as usual with `npm run dev`. To give the Vite dev server its own address, use with a [proxy](/docs/sites/#proxies), such as `rigly proxy vite 5173`.

Global packages installed with `npm install -g` live with each Node version, but Rigly doesn't add them to your PATH yet. Run them with `npx` instead.
