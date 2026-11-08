// Builds getrigly.com into dist/: the landing page (src/index.html) and the docs (content/docs/*.md),
// wrapped in src/layout.html. Run: npm run build. No framework: Markdown → HTML with marked, and a nav
// list below that sets the docs' order.
import { marked } from 'marked';
import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';

const SITE = 'https://getrigly.com';
const DOWNLOAD = 'https://github.com/Rigly-Dev/rigly-mac/releases/latest/download/Rigly.dmg';

// The docs sidebar, in order. Each slug is content/docs/<slug>.md.
const NAV = [
  ['Getting started', ['index', 'installation', 'updates-and-uninstalling', 'beta']],
  ['Sites', ['sites', 'https', 'new-sites', 'project-file']],
  ['Runtimes', ['php', 'node']],
  ['Services', ['services', 'databases']],
  ['Tools', ['mail', 'insights', 'sharing', 'workspaces']],
  ['Reference', ['cli', 'troubleshooting']],
];

const out = 'dist';
rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });
cpSync('public', out, { recursive: true });

const layout = readFileSync('src/layout.html', 'utf8');
const fill = (template, values) => template.replace(/\{\{(\w+)\}\}/g, (_, key) => values[key] ?? '');
const escape = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const slugify = (s) => s.toLowerCase().replace(/<[^>]+>/g, '').replace(/&[a-z]+;/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

function write(path, html) {
  const file = join(out, path);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
}

function page({ title, description, body, path, bodyClass = '' }) {
  return fill(layout, {
    title: title === 'Rigly' ? 'Rigly: local PHP development for the Mac' : `${title} · Rigly`,
    description: escape(description),
    canonical: `${SITE}${path}`,
    body,
    bodyClass,
    download: DOWNLOAD,
    year: String(new Date().getFullYear()),
  });
}

// Front matter: a leading ---/--- block of `key: value` lines.
function parse(source) {
  const meta = {};
  const match = source.match(/^---\n([\s\S]*?)\n---\n/);
  if (match) {
    for (const line of match[1].split('\n')) {
      const i = line.indexOf(':');
      if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim();
    }
    source = source.slice(match[0].length);
  }
  return { meta, markdown: source };
}

// Headings get ids (for links and the "On this page" list).
let toc = [];
marked.use({
  renderer: {
    heading({ tokens, depth }) {
      const text = this.parser.parseInline(tokens);
      const id = slugify(text);
      if (depth === 2 || depth === 3) toc.push({ depth, id, text });
      return `<h${depth} id="${id}"><a class="anchor" href="#${id}" aria-hidden="true">#</a>${text}</h${depth}>\n`;
    },
  },
});

const docs = {};
for (const [, slugs] of NAV) {
  for (const slug of slugs) {
    const file = `content/docs/${slug}.md`;
    if (!existsSync(file)) throw new Error(`Missing ${file}`);
    const { meta, markdown } = parse(readFileSync(file, 'utf8'));
    if (!meta.title) throw new Error(`${file} has no title`);
    toc = [];
    const html = marked.parse(markdown.replaceAll('{{download}}', DOWNLOAD));
    docs[slug] = { ...meta, slug, html, toc };
  }
}

const order = NAV.flatMap(([, slugs]) => slugs);
const href = (slug) => (slug === 'index' ? '/docs/' : `/docs/${slug}/`);

for (const slug of order) {
  const doc = docs[slug];
  const nav = NAV.map(([group, slugs]) => `
      <div class="nav-group">
        <p>${group}</p>
        <ul>${slugs.map((s) => `<li><a href="${href(s)}"${s === slug ? ' aria-current="page"' : ''}>${docs[s].nav ?? docs[s].title}</a></li>`).join('')}</ul>
      </div>`).join('');
  const i = order.indexOf(slug);
  const prev = order[i - 1], next = order[i + 1];
  const pager = `
      <nav class="pager">
        ${prev ? `<a class="prev" href="${href(prev)}"><span>Previous</span>${docs[prev].title}</a>` : '<span></span>'}
        ${next ? `<a class="next" href="${href(next)}"><span>Next</span>${docs[next].title}</a>` : '<span></span>'}
      </nav>`;
  const onThisPage = doc.toc.filter((h) => h.depth === 2);
  const body = `
  <div class="docs">
    <aside class="docs-nav" aria-label="Documentation">
      <details open><summary>Documentation</summary>${nav}</details>
    </aside>
    <article class="prose">
      <h1>${doc.title}</h1>
      ${doc.html}
      ${pager}
    </article>
    <aside class="toc" aria-label="On this page">
      ${onThisPage.length > 1 ? `<p>On this page</p><ul>${onThisPage.map((h) => `<li><a href="#${h.id}">${h.text}</a></li>`).join('')}</ul>` : ''}
    </aside>
  </div>`;
  write(`${href(slug).slice(1)}index.html`, page({
    title: doc.title, description: doc.description ?? 'Rigly documentation.', body, path: href(slug), bodyClass: 'docs-page',
  }));
}

write('index.html', page({
  title: 'Rigly',
  description: 'Rigly is a fast, native local PHP development environment for macOS: Caddy, every PHP version, Node, databases, mail, dumps and public sharing, from your menu bar.',
  body: fill(readFileSync('src/index.html', 'utf8'), { download: DOWNLOAD }),
  path: '/',
  bodyClass: 'home',
}));

write('404.html', page({
  title: 'Page not found',
  description: 'This page does not exist.',
  body: `<section class="notfound"><h1>Page not found</h1><p>That page doesn't exist. Try the <a href="/docs/">documentation</a> or the <a href="/">home page</a>.</p></section>`,
  path: '/404.html',
}));

const urls = ['/', ...order.map(href)];
write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${SITE}${u}</loc></url>`).join('\n')}
</urlset>
`);
write('robots.txt', `User-agent: *\nAllow: /\nSitemap: ${SITE}/sitemap.xml\n`);

console.log(`Built ${urls.length} pages into ${out}/`);
