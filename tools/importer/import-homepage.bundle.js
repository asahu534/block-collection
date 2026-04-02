var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-homepage.js
  var import_homepage_exports = {};
  __export(import_homepage_exports, {
    default: () => import_homepage_default
  });

  // tools/importer/parsers/hero-landing.js
  function parse(element, { document }) {
    const heroImg = element.querySelector(".grid-layout .cover-image");
    const heading = element.querySelector("h1");
    const subheading = element.querySelector(".subheading, p.subheading");
    const buttons = Array.from(element.querySelectorAll(".button-group a.button"));
    const cells = [];
    if (heroImg) {
      const imgFrag = document.createDocumentFragment();
      imgFrag.appendChild(document.createComment(" field:image "));
      imgFrag.appendChild(heroImg);
      cells.push([imgFrag]);
    } else {
      cells.push([""]);
    }
    const textFrag = document.createDocumentFragment();
    textFrag.appendChild(document.createComment(" field:text "));
    if (heading) textFrag.appendChild(heading);
    if (subheading) textFrag.appendChild(subheading);
    buttons.forEach((btn) => textFrag.appendChild(btn));
    cells.push([textFrag]);
    const block = WebImporter.Blocks.createBlock(document, { name: "hero-landing", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/hero-banner.js
  function parse2(element, { document }) {
    const bgImg = element.querySelector(".cover-image.utility-overlay, .cover-image");
    const heading = element.querySelector(".card-body h2, .card-body h1, h1, h2");
    const description = element.querySelector(".card-body .subheading, .card-body p:not(.subheading)");
    const ctaBtn = element.querySelector(".card-body .button-group a.button, .button-group a");
    const cells = [];
    if (bgImg) {
      const imgFrag = document.createDocumentFragment();
      imgFrag.appendChild(document.createComment(" field:image "));
      imgFrag.appendChild(bgImg);
      cells.push([imgFrag]);
    } else {
      cells.push([""]);
    }
    const textFrag = document.createDocumentFragment();
    textFrag.appendChild(document.createComment(" field:text "));
    if (heading) textFrag.appendChild(heading);
    if (description) textFrag.appendChild(description);
    if (ctaBtn) textFrag.appendChild(ctaBtn);
    cells.push([textFrag]);
    const block = WebImporter.Blocks.createBlock(document, { name: "hero-banner", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-article.js
  function parse3(element, { document }) {
    const cols = element.querySelectorAll(":scope > div");
    const cells = [];
    if (cols.length >= 2) {
      const col1Content = [];
      const col1Img = cols[0].querySelector("img, picture");
      if (col1Img) col1Content.push(col1Img);
      const col2Content = [];
      const heading = cols[1].querySelector("h2, h1");
      const breadcrumbs = cols[1].querySelector(".breadcrumbs");
      const authorInfo = cols[1].querySelectorAll(".flex-horizontal");
      if (breadcrumbs) col2Content.push(breadcrumbs);
      if (heading) col2Content.push(heading);
      authorInfo.forEach((info) => col2Content.push(info));
      cells.push([col1Content.length ? col1Content : "", col2Content.length ? col2Content : ""]);
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-article", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-gallery.js
  function parse4(element, { document }) {
    const imageContainers = element.querySelectorAll(".utility-aspect-1x1, :scope > div");
    const cells = [];
    imageContainers.forEach((container) => {
      const img = container.querySelector("img, picture");
      if (img) {
        const imgFrag = document.createDocumentFragment();
        imgFrag.appendChild(document.createComment(" field:image "));
        imgFrag.appendChild(img);
        cells.push([imgFrag, ""]);
      }
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-gallery", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-article.js
  function parse5(element, { document }) {
    const articleCards = element.querySelectorAll("a.article-card, .article-card");
    const cells = [];
    articleCards.forEach((card) => {
      const img = card.querySelector(".article-card-image img, img");
      const tag = card.querySelector(".tag");
      const date = card.querySelector(".paragraph-sm.utility-text-secondary");
      const title = card.querySelector("h3, h4, .h4-heading");
      const imgFrag = document.createDocumentFragment();
      imgFrag.appendChild(document.createComment(" field:image "));
      if (img) imgFrag.appendChild(img);
      const textFrag = document.createDocumentFragment();
      textFrag.appendChild(document.createComment(" field:text "));
      if (tag) textFrag.appendChild(tag);
      if (date) textFrag.appendChild(date);
      if (title) textFrag.appendChild(title);
      const link = card.closest("a[href]") || card;
      if (link.href && title) {
        const a = document.createElement("a");
        a.href = link.href;
        a.textContent = title.textContent;
        title.textContent = "";
        title.appendChild(a);
      }
      cells.push([imgFrag, textFrag]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-article", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/tabs-testimonial.js
  function parse6(element, { document }) {
    const tabPanes = element.querySelectorAll(".tab-pane");
    const tabButtons = element.querySelectorAll(".tab-menu-link, .tab-menu button");
    const cells = [];
    tabPanes.forEach((pane, i) => {
      const titleFrag = document.createDocumentFragment();
      titleFrag.appendChild(document.createComment(" field:title "));
      const btn = tabButtons[i];
      if (btn) {
        const nameEl = btn.querySelector("strong");
        if (nameEl) {
          titleFrag.appendChild(document.createTextNode(nameEl.textContent));
        } else {
          titleFrag.appendChild(document.createTextNode(btn.textContent.trim()));
        }
      }
      const contentFrag = document.createDocumentFragment();
      const img = pane.querySelector("img, picture");
      const name = pane.querySelector(".paragraph-xl strong, strong");
      const role = pane.querySelector(".paragraph-xl + div, div:not(.grid-layout):not(.paragraph-xl)");
      const quote = pane.querySelector("p.paragraph-xl");
      if (name) {
        contentFrag.appendChild(document.createComment(" field:content_heading "));
        const h3 = document.createElement("h3");
        h3.textContent = name.textContent;
        contentFrag.appendChild(h3);
      }
      if (img) {
        contentFrag.appendChild(document.createComment(" field:content_image "));
        contentFrag.appendChild(img);
      }
      contentFrag.appendChild(document.createComment(" field:content_richtext "));
      if (role && role.textContent.trim() && !role.querySelector("strong")) {
        const p = document.createElement("p");
        p.textContent = role.textContent.trim();
        contentFrag.appendChild(p);
      }
      if (quote) contentFrag.appendChild(quote);
      cells.push([titleFrag, contentFrag]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "tabs-testimonial", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/accordion-faq.js
  function parse7(element, { document }) {
    const faqItems = element.querySelectorAll("details.faq-item, details");
    const cells = [];
    faqItems.forEach((item) => {
      const summary = item.querySelector("summary, .faq-question");
      const answer = item.querySelector(".faq-answer");
      const summaryFrag = document.createDocumentFragment();
      summaryFrag.appendChild(document.createComment(" field:summary "));
      if (summary) {
        const questionSpan = summary.querySelector("span");
        summaryFrag.appendChild(document.createTextNode(
          questionSpan ? questionSpan.textContent : summary.textContent.trim()
        ));
      }
      const textFrag = document.createDocumentFragment();
      textFrag.appendChild(document.createComment(" field:text "));
      if (answer) {
        const answerP = answer.querySelector("p");
        if (answerP) textFrag.appendChild(answerP);
      }
      cells.push([summaryFrag, textFrag]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "accordion-faq", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/wknd-trendsetters-cleanup.js
  var H = { before: "beforeTransform", after: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === H.before) {
      WebImporter.DOMUtils.remove(element, [".skip-link"]);
    }
    if (hookName === H.after) {
      WebImporter.DOMUtils.remove(element, [
        ".navbar",
        "footer.footer",
        ".nav-mobile-menu-button",
        "noscript",
        "link"
      ]);
      element.querySelectorAll("[data-astro-cid-37fxchfa]").forEach((el) => {
        el.removeAttribute("data-astro-cid-37fxchfa");
      });
    }
  }

  // tools/importer/transformers/wknd-trendsetters-sections.js
  function transform2(hookName, element, payload) {
    if (hookName === "afterTransform") {
      const { template } = payload;
      if (!template || !template.sections || template.sections.length < 2) return;
      const document = element.ownerDocument;
      const sections = template.sections;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const selectors = Array.isArray(section.selector) ? section.selector : [section.selector];
        let sectionEl = null;
        for (const sel of selectors) {
          sectionEl = element.querySelector(sel);
          if (sectionEl) break;
        }
        if (!sectionEl) continue;
        if (section.style) {
          const metaBlock = WebImporter.Blocks.createBlock(document, {
            name: "Section Metadata",
            cells: { style: section.style }
          });
          sectionEl.append(metaBlock);
        }
        if (i > 0) {
          const hr = document.createElement("hr");
          sectionEl.before(hr);
        }
      }
    }
  }

  // tools/importer/import-homepage.js
  var parsers = {
    "hero-landing": parse,
    "hero-banner": parse2,
    "columns-article": parse3,
    "cards-gallery": parse4,
    "cards-article": parse5,
    "tabs-testimonial": parse6,
    "accordion-faq": parse7
  };
  var PAGE_TEMPLATE = {
    name: "homepage",
    description: "WKND Trendsetters homepage",
    urls: ["https://wknd-trendsetters.site"],
    blocks: [
      {
        name: "hero-landing",
        instances: ["header.section.secondary-section"]
      },
      {
        name: "columns-article",
        instances: ["main > section:nth-of-type(1) .grid-layout.tablet-1-column.grid-gap-lg"]
      },
      {
        name: "cards-gallery",
        instances: ["main > section:nth-of-type(2) .grid-layout.desktop-4-column.tablet-2-column-1.mobile-portrait-1-column.grid-gap-sm"]
      },
      {
        name: "tabs-testimonial",
        instances: ["main > section:nth-of-type(3) .tabs-wrapper"]
      },
      {
        name: "cards-article",
        instances: ["main > section:nth-of-type(4) .grid-layout.desktop-4-column.tablet-2-column-1.mobile-portrait-1-column.grid-gap-md"]
      },
      {
        name: "accordion-faq",
        instances: ["main > section:nth-of-type(5) .faq-list"]
      },
      {
        name: "hero-banner",
        instances: ["section.section.inverse-section .utility-position-relative"]
      }
    ],
    sections: [
      {
        id: "section-1",
        name: "Hero",
        selector: "header.section.secondary-section",
        style: null,
        blocks: ["hero-landing"],
        defaultContent: []
      },
      {
        id: "section-2",
        name: "Featured Article",
        selector: "main > section:nth-of-type(1)",
        style: null,
        blocks: ["columns-article"],
        defaultContent: []
      },
      {
        id: "section-3",
        name: "Image Gallery",
        selector: "main > section:nth-of-type(2)",
        style: "secondary",
        blocks: ["cards-gallery"],
        defaultContent: [
          "main > section:nth-of-type(2) .utility-text-align-center h2",
          "main > section:nth-of-type(2) .utility-text-align-center .paragraph-lg"
        ]
      },
      {
        id: "section-4",
        name: "Testimonials Tabs",
        selector: "main > section:nth-of-type(3)",
        style: null,
        blocks: ["tabs-testimonial"],
        defaultContent: []
      },
      {
        id: "section-5",
        name: "Latest Articles",
        selector: "main > section:nth-of-type(4)",
        style: "secondary",
        blocks: ["cards-article"],
        defaultContent: [
          "main > section:nth-of-type(4) .utility-text-align-center h2",
          "main > section:nth-of-type(4) .utility-text-align-center .paragraph-lg"
        ]
      },
      {
        id: "section-6",
        name: "FAQ",
        selector: "main > section:nth-of-type(5)",
        style: null,
        blocks: ["accordion-faq"],
        defaultContent: [
          "main > section:nth-of-type(5) .grid-layout > div:first-child h2",
          "main > section:nth-of-type(5) .grid-layout > div:first-child .subheading"
        ]
      },
      {
        id: "section-7",
        name: "CTA Banner",
        selector: "section.section.inverse-section",
        style: null,
        blocks: ["hero-banner"],
        defaultContent: []
      }
    ]
  };
  var transformers = [
    transform,
    ...PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [transform2] : []
  ];
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), {
      template: PAGE_TEMPLATE
    });
    transformers.forEach((transformerFn) => {
      try {
        transformerFn.call(null, hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
  function findBlocksOnPage(document, template) {
    const pageBlocks = [];
    template.blocks.forEach((blockDef) => {
      blockDef.instances.forEach((selector) => {
        const elements = document.querySelectorAll(selector);
        if (elements.length === 0) {
          console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
        }
        elements.forEach((element) => {
          pageBlocks.push({
            name: blockDef.name,
            selector,
            element,
            section: blockDef.section || null
          });
        });
      });
    });
    console.log(`Found ${pageBlocks.length} block instances on page`);
    return pageBlocks;
  }
  var import_homepage_default = {
    transform: (payload) => {
      const { document, url, html, params } = payload;
      const main = document.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
      pageBlocks.forEach((block) => {
        const parser = parsers[block.name];
        if (parser) {
          try {
            parser(block.element, { document, url, params });
          } catch (e) {
            console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
          }
        } else {
          console.warn(`No parser found for block: ${block.name}`);
        }
      });
      executeTransformers("afterTransform", main, payload);
      const hr = document.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const path = WebImporter.FileUtils.sanitizePath(
        new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "") || "/index"
      );
      return [{
        element: main,
        path,
        report: {
          title: document.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_homepage_exports);
})();
