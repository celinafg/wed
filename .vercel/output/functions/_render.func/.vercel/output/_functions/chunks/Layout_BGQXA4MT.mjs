import { o as createAstro, k as createComponent, l as renderTemplate, p as addAttribute, q as renderHead, t as renderSlot } from './astro/server_c4S24NXc.mjs';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';
/* empty css                         */

const $$Astro = createAstro("https://astro-naut-template.vercel.app/");
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  const metaData = {
    keywords: "celina, enzo, celina and enzo, wedding",
    description: "celina and enzo are getting married",
    imageType: "image/png",
    imageWidth: "1600",
    imageHeight: "882",
    type: "website",
    siteName: "CEWedding"
  };
  const canonicalURL = new URL(Astro2.url.pathname, Astro2.site);
  const socialImageURL = new URL("/seo.png", Astro2.url);
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><meta name="generator"${addAttribute(Astro2.generator, "content")}><meta name="keywords"${addAttribute(metaData.keywords, "content")}><meta name="description"${addAttribute(metaData.description, "content")}><link rel="icon" type="image/svg+xml" href="https://res.cloudinary.com/digifab/image/upload/v1722138525/wedding/angel1_zzyoxv.png"><link rel="canonical"${addAttribute(canonicalURL, "href")}><title>${title}</title><meta property="og:url"${addAttribute(canonicalURL, "content")}><meta property="og:type"${addAttribute(metaData.type, "content")}><meta property="og:site_name"${addAttribute(metaData.siteName, "content")}><meta property="og:description"${addAttribute(metaData.description, "content")}><meta property="og:title"${addAttribute(title, "content")}><meta property="og:image"${addAttribute(socialImageURL, "content")}><meta property="og:image:type"${addAttribute(metaData.imageType, "content")}><meta property="og:image:alt"${addAttribute(title, "content")}><meta property="og:image:width"${addAttribute(metaData.imageWidth, "content")}><meta property="og:image:height"${addAttribute(metaData.imageHeight, "content")}><meta name="twitter:title"${addAttribute(title, "content")}><meta name="twitter:description"${addAttribute(metaData.description, "content")}><meta name="twitter:image"${addAttribute(socialImageURL, "content")}><meta name="twitter:image:alt"${addAttribute(title, "content")}>${renderHead()}</head> <body> ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "/Users/celinag/Development/wedding/src/layouts/Layout.astro", void 0);

export { $$Layout as $ };
