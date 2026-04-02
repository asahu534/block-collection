/* eslint-disable */
/* global WebImporter */

// PARSER IMPORTS
import heroWelcomeParser from './parsers/hero-welcome.js';
import columnsInfoParser from './parsers/columns-info.js';
import cardsFeatureParser from './parsers/cards-feature.js';

// TRANSFORMER IMPORTS
import cleanupTransformer from './transformers/boilerplate-cleanup.js';
import sectionsTransformer from './transformers/boilerplate-sections.js';

// PARSER REGISTRY
const parsers = {
  'hero-welcome': heroWelcomeParser,
  'columns-info': columnsInfoParser,
  'cards-feature': cardsFeatureParser,
};

// PAGE TEMPLATE CONFIGURATION
const PAGE_TEMPLATE = {
  name: 'homepage',
  description: 'Homepage with welcome heading - AEM boilerplate page with hero, columns, and cards',
  urls: [
    'https://main--boilerplate--asahu534.aem.page/',
  ],
  blocks: [
    {
      name: 'hero-welcome',
      instances: ['.section.hero-container .hero.block'],
    },
    {
      name: 'columns-info',
      instances: ['.section.columns-container .columns.block.columns-2-cols'],
    },
    {
      name: 'cards-feature',
      instances: ['.section.highlight.cards-container .cards.block'],
    },
  ],
  sections: [
    {
      id: 'section-1',
      name: 'Hero',
      selector: '.section.hero-container',
      style: null,
      blocks: ['hero-welcome'],
      defaultContent: [],
    },
    {
      id: 'section-2',
      name: 'Content and Columns',
      selector: '.section.columns-container',
      style: null,
      blocks: ['columns-info'],
      defaultContent: ['.section.columns-container > .default-content-wrapper'],
    },
    {
      id: 'section-3',
      name: 'Highlights Cards',
      selector: '.section.highlight.cards-container',
      style: 'highlight',
      blocks: ['cards-feature'],
      defaultContent: ['.section.highlight.cards-container > .default-content-wrapper'],
    },
  ],
};

// TRANSFORMER REGISTRY
const transformers = [
  cleanupTransformer,
  ...(PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [sectionsTransformer] : []),
];

/**
 * Execute all page transformers for a specific hook
 */
function executeTransformers(hookName, element, payload) {
  const enhancedPayload = {
    ...payload,
    template: PAGE_TEMPLATE,
  };
  transformers.forEach((transformerFn) => {
    try {
      transformerFn.call(null, hookName, element, enhancedPayload);
    } catch (e) {
      console.error(`Transformer failed at ${hookName}:`, e);
    }
  });
}

/**
 * Find all blocks on the page based on the embedded template configuration
 */
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
          section: blockDef.section || null,
        });
      });
    });
  });
  console.log(`Found ${pageBlocks.length} block instances on page`);
  return pageBlocks;
}

export default {
  transform: (payload) => {
    const { document, url, html, params } = payload;
    const main = document.body;

    // 1. Execute beforeTransform transformers
    executeTransformers('beforeTransform', main, payload);

    // 2. Find blocks on page using embedded template
    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);

    // 3. Parse each block using registered parsers
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

    // 4. Execute afterTransform transformers (cleanup + section breaks)
    executeTransformers('afterTransform', main, payload);

    // 5. Apply WebImporter built-in rules
    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    // 6. Generate sanitized path
    const path = WebImporter.FileUtils.sanitizePath(
      new URL(params.originalURL).pathname.replace(/\/$/, '').replace(/\.html$/, '') || '/index'
    );

    return [{
      element: main,
      path: path || '/index',
      report: {
        title: document.title,
        template: PAGE_TEMPLATE.name,
        blocks: pageBlocks.map((b) => b.name),
      },
    }];
  },
};
