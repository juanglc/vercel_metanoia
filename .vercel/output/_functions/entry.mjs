import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './_assets/_@astrojs-ssr-adapter.B4XSDKtQ.js';
import { manifest } from './manifest_DO8k2h1d.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/api/contact.astro.mjs');
const _page2 = () => import('./pages/en/about.astro.mjs');
const _page3 = () => import('./pages/en/concerts.astro.mjs');
const _page4 = () => import('./pages/en/contact.astro.mjs');
const _page5 = () => import('./pages/en/gallery.astro.mjs');
const _page6 = () => import('./pages/en/services.astro.mjs');
const _page7 = () => import('./pages/en.astro.mjs');
const _page8 = () => import('./pages/es/about.astro.mjs');
const _page9 = () => import('./pages/es/concerts.astro.mjs');
const _page10 = () => import('./pages/es/contact.astro.mjs');
const _page11 = () => import('./pages/es/gallery.astro.mjs');
const _page12 = () => import('./pages/es/services.astro.mjs');
const _page13 = () => import('./pages/es.astro.mjs');
const _page14 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/api/contact.ts", _page1],
    ["src/pages/en/about.astro", _page2],
    ["src/pages/en/concerts.astro", _page3],
    ["src/pages/en/contact.astro", _page4],
    ["src/pages/en/gallery.astro", _page5],
    ["src/pages/en/services.astro", _page6],
    ["src/pages/en/index.astro", _page7],
    ["src/pages/es/about.astro", _page8],
    ["src/pages/es/concerts.astro", _page9],
    ["src/pages/es/contact.astro", _page10],
    ["src/pages/es/gallery.astro", _page11],
    ["src/pages/es/services.astro", _page12],
    ["src/pages/es/index.astro", _page13],
    ["src/pages/index.astro", _page14]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "33c0cb83-0447-4f65-a56a-8b6731a973ae",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
