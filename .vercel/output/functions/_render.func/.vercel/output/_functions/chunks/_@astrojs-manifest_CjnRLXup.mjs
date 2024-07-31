import 'cookie';
import { bold, red, yellow, dim, blue } from 'kleur/colors';
import 'html-escaper';
import 'clsx';
import './astro/server_c4S24NXc.mjs';
import { compile } from 'path-to-regexp';

const dateTimeFormat = new Intl.DateTimeFormat([], {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false
});
const levels = {
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  silent: 90
};
function log(opts, level, label, message, newLine = true) {
  const logLevel = opts.level;
  const dest = opts.dest;
  const event = {
    label,
    level,
    message,
    newLine
  };
  if (!isLogLevelEnabled(logLevel, level)) {
    return;
  }
  dest.write(event);
}
function isLogLevelEnabled(configuredLogLevel, level) {
  return levels[configuredLogLevel] <= levels[level];
}
function info(opts, label, message, newLine = true) {
  return log(opts, "info", label, message, newLine);
}
function warn(opts, label, message, newLine = true) {
  return log(opts, "warn", label, message, newLine);
}
function error(opts, label, message, newLine = true) {
  return log(opts, "error", label, message, newLine);
}
function debug(...args) {
  if ("_astroGlobalDebug" in globalThis) {
    globalThis._astroGlobalDebug(...args);
  }
}
function getEventPrefix({ level, label }) {
  const timestamp = `${dateTimeFormat.format(/* @__PURE__ */ new Date())}`;
  const prefix = [];
  if (level === "error" || level === "warn") {
    prefix.push(bold(timestamp));
    prefix.push(`[${level.toUpperCase()}]`);
  } else {
    prefix.push(timestamp);
  }
  if (label) {
    prefix.push(`[${label}]`);
  }
  if (level === "error") {
    return red(prefix.join(" "));
  }
  if (level === "warn") {
    return yellow(prefix.join(" "));
  }
  if (prefix.length === 1) {
    return dim(prefix[0]);
  }
  return dim(prefix[0]) + " " + blue(prefix.splice(1).join(" "));
}
if (typeof process !== "undefined") {
  let proc = process;
  if ("argv" in proc && Array.isArray(proc.argv)) {
    if (proc.argv.includes("--verbose")) ; else if (proc.argv.includes("--silent")) ; else ;
  }
}
class Logger {
  options;
  constructor(options) {
    this.options = options;
  }
  info(label, message, newLine = true) {
    info(this.options, label, message, newLine);
  }
  warn(label, message, newLine = true) {
    warn(this.options, label, message, newLine);
  }
  error(label, message, newLine = true) {
    error(this.options, label, message, newLine);
  }
  debug(label, ...messages) {
    debug(label, ...messages);
  }
  level() {
    return this.options.level;
  }
  forkIntegrationLogger(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
}
class AstroIntegrationLogger {
  options;
  label;
  constructor(logging, label) {
    this.options = logging;
    this.label = label;
  }
  /**
   * Creates a new logger instance with a new label, but the same log options.
   */
  fork(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
  info(message) {
    info(this.options, this.label, message);
  }
  warn(message) {
    warn(this.options, this.label, message);
  }
  error(message) {
    error(this.options, this.label, message);
  }
  debug(message) {
    debug(this.label, message);
  }
}

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    const path = toPath(sanitizedParams);
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware(_, next) {
      return next();
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes
  };
}

const manifest = deserializeManifest({"adapterName":"@astrojs/vercel/serverless","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.CO-EdLcU.css"},{"type":"inline","content":"header[data-astro-cid-zetdm5md]{margin:0 auto;max-width:666px}a[data-astro-cid-zetdm5md]{color:var(--color-purple-light)}@media (prefers-color-scheme: light){a[data-astro-cid-zetdm5md]{color:var(--color-blue)}}\n"}],"routeData":{"route":"/404","isIndex":false,"type":"page","pattern":"^\\/404\\/?$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"inline","value":"const o=document.getElementById(\"back-to-top\"),t=()=>{o.style.display=window.scrollY>0?\"block\":\"none\"};window.addEventListener(\"scroll\",t);\n"}],"styles":[{"type":"external","src":"/_astro/index.CO-EdLcU.css"},{"type":"inline","content":"a[data-astro-cid-cqqqsvbn]{align-items:center;border-radius:var(--border-radius);display:flex;height:1px;left:-9999px;padding:var(--space-xs);position:absolute;overflow:hidden;top:auto;width:1px}a[data-astro-cid-cqqqsvbn]:focus,a[data-astro-cid-cqqqsvbn]:focus-visible{height:auto;left:8px;position:fixed;text-decoration:none;top:8px;width:auto}img[data-astro-cid-cqqqsvbn]{margin-left:var(--space-xs);transform:rotate(180deg);filter:invert(1)}.date[data-astro-cid-xhaoqxbd]{display:flex;align-items:center;justify-content:center}.left[data-astro-cid-xhaoqxbd]{transform:scaleX(-1)}.wrapper[data-astro-cid-xhaoqxbd]{margin:0 auto;max-width:768px;padding:0 var(--space-s)}.colblue[data-astro-cid-xhaoqxbd]{background-color:#ffebcd}img[data-astro-cid-xhaoqxbd]{height:auto;margin:var(--space-l) 0}section[data-astro-cid-xhaoqxbd]{margin:var(--space-2xl) 0}.button-wrapper[data-astro-cid-xhaoqxbd]{margin:var(--space-xl) 0}.date[data-astro-cid-xhaoqxbd]>div[data-astro-cid-xhaoqxbd]{padding:0 2rem}.pm[data-astro-cid-xhaoqxbd]{font-size:var(--space-s)}.where[data-astro-cid-xhaoqxbd]{margin:0 auto;padding-bottom:5rem}.where[data-astro-cid-xhaoqxbd]>div[data-astro-cid-xhaoqxbd]{padding-top:2rem}.where[data-astro-cid-xhaoqxbd]>div[data-astro-cid-xhaoqxbd]>p[data-astro-cid-xhaoqxbd]{margin:0 auto}#home[data-astro-cid-xhaoqxbd]{text-align:center}h2[data-astro-cid-xhaoqxbd]{margin-bottom:var(--space-xs)}p[data-astro-cid-xhaoqxbd]{margin:0}p[data-astro-cid-xhaoqxbd]+p[data-astro-cid-xhaoqxbd]{margin-top:var(--space-xs)}li[data-astro-cid-xhaoqxbd]{margin:0}h5[data-astro-cid-xhaoqxbd]>div[data-astro-cid-xhaoqxbd]>p[data-astro-cid-xhaoqxbd]{width:20vw}.smol[data-astro-cid-xhaoqxbd]{font-size:var(--step-0)}footer[data-astro-cid-xhaoqxbd]{border-top:1px solid var(--color-grey-dark);text-align:center;margin-top:var(--space-3xl);padding:var(--space-l) 0}footer[data-astro-cid-xhaoqxbd] p[data-astro-cid-xhaoqxbd]{font-size:var(--step-0)}.chapel[data-astro-cid-xhaoqxbd]{font-family:Leifa bold,sans-serif;font-size:1.3rem}h1[data-astro-cid-xhaoqxbd]{margin:0}a[data-astro-cid-hhu5dpqk]{border-radius:var(--border-radius);bottom:var(--space-xs);position:fixed;right:var(--space-xs)}@media (prefers-color-scheme: light){img[data-astro-cid-hhu5dpqk]{filter:invert(1)}}\n"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"site":"https://astro-naut-template.vercel.app/","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/celinag/Development/wedding/src/pages/404.astro",{"propagation":"none","containsHead":true}],["/Users/celinag/Development/wedding/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var i=t=>{let e=async()=>{await(await t())()};\"requestIdleCallback\"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/404@_@astro":"pages/404.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astro-renderers":"renderers.mjs","/Users/celinag/Development/wedding/node_modules/astro/dist/env/setup.js":"chunks/astro/env-setup_Cr6XTFvb.mjs","/node_modules/astro/dist/assets/endpoint/generic.js":"chunks/generic_Bo6jqnM-.mjs","/src/pages/404.astro":"chunks/404_DXjFu_GK.mjs","/src/pages/index.astro":"chunks/index_BsqaRyX6.mjs","\u0000@astrojs-manifest":"manifest_CYCobpkU.mjs","/astro/hoisted.js?q=0":"_astro/hoisted.CMmwAZYZ.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/arrow-upward.BW8vTDjY.svg","/_astro/index.CO-EdLcU.css"],"buildFormat":"directory","checkOrigin":false,"rewritingEnabled":false,"experimentalEnvGetSecretEnabled":false});

export { AstroIntegrationLogger as A, Logger as L, getEventPrefix as g, levels as l, manifest as m };