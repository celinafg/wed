import { k as createComponent, l as renderTemplate, n as maybeRenderHead, m as renderComponent } from './astro/server_c4S24NXc.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$Layout } from './Layout_BGQXA4MT.mjs';
import { $ as $$Image } from './_astro_assets_Db7LFfCD.mjs';
/* empty css                         */
import 'clsx';

const arrow = new Proxy({"src":"/_astro/arrow-upward.BW8vTDjY.svg","width":48,"height":48,"format":"svg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/celinag/Development/wedding/src/images/arrow-upward.svg";
							}
							
							return target[name];
						}
					});

const $$SkipLink = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<a href="#main" id="skip-link" data-astro-cid-cqqqsvbn>Skip to main content ${renderComponent($$result, "Image", $$Image, { "alt": "Arrow down", "height": 36, "src": arrow, "width": 36, "data-astro-cid-cqqqsvbn": true })}</a> `;
}, "/Users/celinag/Development/wedding/src/components/utils/SkipLink.astro", void 0);

const $$Timeline = createComponent(($$result, $$props, $$slots) => {
  (/* @__PURE__ */ new Date()).getFullYear();
  return renderTemplate`${maybeRenderHead()}<div class="wrapper"> <p>hi I'm a timeline</p> </div> `;
}, "/Users/celinag/Development/wedding/src/components/Timeline.astro", void 0);

const $$Home = createComponent(($$result, $$props, $$slots) => {
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  return renderTemplate`${maybeRenderHead()}<div class="wrapper" data-astro-cid-xhaoqxbd> <main id="main" class="main" data-astro-cid-xhaoqxbd> <section aria-label="Home" id="home" class="section" data-astro-cid-xhaoqxbd> <div class="date" data-astro-cid-xhaoqxbd> ${renderComponent($$result, "Image", $$Image, { "alt": "angel", "src": "https://res.cloudinary.com/digifab/image/upload/v1722138525/wedding/angel1_zzyoxv.png", "height": 90, "width": 90, "loading": "eager", "data-astro-cid-xhaoqxbd": true })} <div data-astro-cid-xhaoqxbd> <p data-astro-cid-xhaoqxbd>WEDNESDAY</p> <h4 data-astro-cid-xhaoqxbd>OCTOBER 16TH</h4> <p data-astro-cid-xhaoqxbd>2024</p> </div> ${renderComponent($$result, "Image", $$Image, { "alt": "angel", "class": "flip left", "src": "https://res.cloudinary.com/digifab/image/upload/v1722138525/wedding/angel1_zzyoxv.png", "height": 90, "width": 90, "loading": "eager", "data-astro-cid-xhaoqxbd": true })} </div> <h1 data-astro-cid-xhaoqxbd>ENZO AND CELINA</h1> <div class="where" data-astro-cid-xhaoqxbd> <div class="pm" data-astro-cid-xhaoqxbd> <p data-astro-cid-xhaoqxbd>2PM, THE 16TH OF OCTOBER</p> </div> <div data-astro-cid-xhaoqxbd> <h5 data-astro-cid-xhaoqxbd>CEREMONY VENUE</h5> <p data-astro-cid-xhaoqxbd> <span class="chapel" id="chapel" data-astro-cid-xhaoqxbd> CHAPEL ON THE HILL</span> <br data-astro-cid-xhaoqxbd>BATULAO RD. CALACA, DON BOSCO NASUGBU BATANGAS
</p> </div> <div data-astro-cid-xhaoqxbd> <h5 data-astro-cid-xhaoqxbd>RECEPTION VENUE</h5> <p data-astro-cid-xhaoqxbd> <span class="chapel" data-astro-cid-xhaoqxbd>ANTONIOS</span> <br data-astro-cid-xhaoqxbd>BATULAO RD. CALACA, DON BOSCO NASUGBU BATANGAS
</p> </div> </div> <button data-astro-cid-xhaoqxbd> <a href="#rsvp" data-astro-cid-xhaoqxbd> RSVP</a> </button> </section> ${renderComponent($$result, "Timeline", $$Timeline, { "data-astro-cid-xhaoqxbd": true })} <section id="rsvp" aria-label="RSVP" class="section" data-astro-cid-xhaoqxbd> <p data-astro-cid-xhaoqxbd>RSVP</p> </section> </main> </div> <section data-astro-cid-xhaoqxbd></section> <footer data-astro-cid-xhaoqxbd> <p data-astro-cid-xhaoqxbd>&copy; ${currentYear} CG</p> </footer>  `;
}, "/Users/celinag/Development/wedding/src/components/Home.astro", void 0);

const $$BackToTop = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<a aria-label="Back to top" href="#start" id="back-to-top" data-astro-cid-hhu5dpqk> ${renderComponent($$result, "Image", $$Image, { "alt": "", "src": arrow, "data-astro-cid-hhu5dpqk": true })} </a>  `;
}, "/Users/celinag/Development/wedding/src/components/utils/BackToTop.astro", void 0);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "ENZO+CELINA" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "SkipLink", $$SkipLink, {})} ${maybeRenderHead()}<div class="sr-only" id="start"></div> ${renderComponent($$result2, "Home", $$Home, {})} <section aria-label="Utilities"> ${renderComponent($$result2, "BackToTop", $$BackToTop, {})} </section> ` })}`;
}, "/Users/celinag/Development/wedding/src/pages/index.astro", void 0);

const $$file = "/Users/celinag/Development/wedding/src/pages/index.astro";
const $$url = "";

export { $$Index as default, $$file as file, $$url as url };
