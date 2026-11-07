---
title: Insights and dumps
nav: Insights & dumps
description: Send dump() and dd() to a viewer, and see each request's queries, jobs, views, HTTP calls, logs and cache.
---
Insights shows what your PHP apps are doing: `dump()` output, and for Laravel apps the queries, jobs, views, outgoing HTTP calls, log entries and cache activity of each request, grouped by request. Open the **Insights** window from the sidebar or the menu bar.

## Dumps

With dump capture on, `dump()` and `dd()` output goes to Insights instead of your page, so it doesn't break your layout or your JSON responses. Symfony's VarDumper and Laravel both support this.

```sh
rigly dumps:on
rigly dumps:off
rigly dumps:clear
```

Or use the **Capturing / Paused** switch in the Insights window. Dump capture applies to your sites; PHP on the command line still prints dumps as usual.

## Laravel events

For Laravel apps, Insights can also capture:

| Event | |
| --- | --- |
| Queries | Each SQL query with its bindings and time |
| Jobs | Queued jobs as they're dispatched and run |
| Views | Views rendered and their data |
| HTTP | Requests your app makes with Laravel's HTTP client |
| Logs | Log entries |
| Cache | Cache hits, misses and writes |

Choose which to capture from the menu in the Insights window. Nothing needs installing in your app: Rigly loads a small hook into PHP while capture is on.
