import { k as createComponent, l as renderTemplate, m as renderComponent, n as maybeRenderHead } from './astro/server_c4S24NXc.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$Layout } from './Layout_BGQXA4MT.mjs';
/* empty css                       */

const $$404 = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Page not found - 404", "data-astro-cid-zetdm5md": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<header data-astro-cid-zetdm5md> <h1 data-astro-cid-zetdm5md>Page not found - 404</h1> <p data-astro-cid-zetdm5md>
Looks like something is wrong with the URL. Let's tack you back to the <a href="/" data-astro-cid-zetdm5md>Homepage</a>!
</p> </header> ` })} `;
}, "/Users/celinag/Development/wedding/src/pages/404.astro", void 0);

const $$file = "/Users/celinag/Development/wedding/src/pages/404.astro";
const $$url = "/404";

export { $$404 as default, $$file as file, $$url as url };
