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

  // tools/importer/parsers/hero-welcome.js
  function parse(element, { document }) {
    const img = element.querySelector("picture img, img");
    const heading = element.querySelector("h1, h2");
    const cells = [];
    if (img) {
      const imgFrag = document.createDocumentFragment();
      imgFrag.appendChild(document.createComment(" field:image "));
      const pic = img.closest("picture") || img;
      imgFrag.appendChild(pic);
      cells.push([imgFrag]);
    } else {
      cells.push([""]);
    }
    const textFrag = document.createDocumentFragment();
    textFrag.appendChild(document.createComment(" field:text "));
    if (heading) {
      textFrag.appendChild(heading);
    }
    cells.push([textFrag]);
    const block = WebImporter.Blocks.createBlock(document, { name: "hero-welcome", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-info.js
  function parse2(element, { document }) {
    const cells = [];
    const rows = element.querySelectorAll(":scope > div");
    rows.forEach((row) => {
      const cols = row.querySelectorAll(":scope > div");
      const rowCells = [];
      cols.forEach((col) => {
        const frag = document.createDocumentFragment();
        while (col.firstChild) {
          frag.appendChild(col.firstChild);
        }
        rowCells.push(frag);
      });
      if (rowCells.length > 0) {
        cells.push(rowCells);
      }
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-info", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-feature.js
  function parse3(element, { document }) {
    const cells = [];
    const cardItems = element.querySelectorAll("ul > li, :scope > div");
    cardItems.forEach((card) => {
      const imageDiv = card.querySelector(".cards-card-image, :scope > div:first-child");
      const img = imageDiv ? imageDiv.querySelector("picture") || imageDiv.querySelector("img") : null;
      const bodyDiv = card.querySelector(".cards-card-body, :scope > div:last-child");
      const imgFrag = document.createDocumentFragment();
      if (img) {
        imgFrag.appendChild(document.createComment(" field:image "));
        imgFrag.appendChild(img);
      }
      const textFrag = document.createDocumentFragment();
      if (bodyDiv) {
        textFrag.appendChild(document.createComment(" field:text "));
        while (bodyDiv.firstChild) {
          textFrag.appendChild(bodyDiv.firstChild);
        }
      }
      cells.push([imgFrag, textFrag]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-feature", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/boilerplate-cleanup.js
  var H = { before: "beforeTransform", after: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === H.before) {
      WebImporter.DOMUtils.remove(element, [".nav-hamburger"]);
    }
    if (hookName === H.after) {
      WebImporter.DOMUtils.remove(element, [
        "header.header-wrapper",
        "footer.footer-wrapper",
        "noscript",
        "iframe",
        "link"
      ]);
    }
  }

  // tools/importer/transformers/boilerplate-sections.js
  var H2 = { before: "beforeTransform", after: "afterTransform" };
  function transform2(hookName, element, payload) {
    if (hookName === H2.after) {
      const { document } = payload;
      const sections = payload.template && payload.template.sections;
      if (!sections || sections.length < 2) return;
      const reversedSections = [...sections].reverse();
      reversedSections.forEach((section) => {
        const selectors = Array.isArray(section.selector) ? section.selector : [section.selector];
        let sectionEl = null;
        for (const sel of selectors) {
          sectionEl = element.querySelector(sel);
          if (sectionEl) break;
        }
        if (!sectionEl) return;
        if (section.style) {
          const sectionMetadata = WebImporter.Blocks.createBlock(document, {
            name: "Section Metadata",
            cells: { style: section.style }
          });
          sectionEl.append(sectionMetadata);
        }
        if (section.id !== sections[0].id) {
          const hr = document.createElement("hr");
          sectionEl.before(hr);
        }
      });
    }
  }

  // tools/importer/import-homepage.js
  var parsers = {
    "hero-welcome": parse,
    "columns-info": parse2,
    "cards-feature": parse3
  };
  var PAGE_TEMPLATE = {
    name: "homepage",
    description: "Homepage with welcome heading - AEM boilerplate page with hero, columns, and cards",
    urls: [
      "https://main--boilerplate--asahu534.aem.page/"
    ],
    blocks: [
      {
        name: "hero-welcome",
        instances: [".section.hero-container .hero.block"]
      },
      {
        name: "columns-info",
        instances: [".section.columns-container .columns.block.columns-2-cols"]
      },
      {
        name: "cards-feature",
        instances: [".section.highlight.cards-container .cards.block"]
      }
    ],
    sections: [
      {
        id: "section-1",
        name: "Hero",
        selector: ".section.hero-container",
        style: null,
        blocks: ["hero-welcome"],
        defaultContent: []
      },
      {
        id: "section-2",
        name: "Content and Columns",
        selector: ".section.columns-container",
        style: null,
        blocks: ["columns-info"],
        defaultContent: [".section.columns-container > .default-content-wrapper"]
      },
      {
        id: "section-3",
        name: "Highlights Cards",
        selector: ".section.highlight.cards-container",
        style: "highlight",
        blocks: ["cards-feature"],
        defaultContent: [".section.highlight.cards-container > .default-content-wrapper"]
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
        path: path || "/index",
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
