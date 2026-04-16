/* eslint-disable */
/* global WebImporter */

// PARSER IMPORTS
import heroLandingParser from './parsers/hero-landing.js';
import heroBannerParser from './parsers/hero-banner.js';
import columnsArticleParser from './parsers/columns-article.js';
import cardsGalleryParser from './parsers/cards-gallery.js';
import cardsArticleParser from './parsers/cards-article.js';
import tabsTestimonialParser from './parsers/tabs-testimonial.js';
import accordionFaqParser from './parsers/accordion-faq.js';

// TRANSFORMER IMPORTS
import cleanupTransformer from './transformers/wknd-trendsetters-cleanup.js';
import sectionsTransformer from './transformers/wknd-trendsetters-sections.js';

// PARSER REGISTRY
const parsers = {
  'hero-landing': heroLandingParser,
  'hero-banner': heroBannerParser,
  'columns-article': columnsArticleParser,
  'cards-gallery': cardsGalleryParser,
  'cards-article': cardsArticleParser,
  'tabs-testimonial': tabsTestimonialParser,
  'accordion-faq': accordionFaqParser,
};

// PAGE TEMPLATE CONFIGURATION
const PAGE_TEMPLATE = {
  name: 'homepage',
  description: 'WKND Trendsetters homepage',
  urls: ['https://wknd-trendsetters.site'],
  blocks: [
    {
      name: 'hero-landing',
      instances: ['header.section.secondary-section'],
    },
    {
      name: 'columns-article',
      instances: ['main > section:nth-of-type(1) .grid-layout.tablet-1-column.grid-gap-lg'],
    },
    {
      name: 'cards-gallery',
      instances: ['main > section:nth-of-type(2) .grid-layout.desktop-4-column.tablet-2-column-1.mobile-portrait-1-column.grid-gap-sm'],
    },
    {
      name: 'tabs-testimonial',
      instances: ['main > section:nth-of-type(3) .tabs-wrapper'],
    },
    {
      name: 'cards-article',
      instances: ['main > section:nth-of-type(4) .grid-layout.desktop-4-column.tablet-2-column-1.mobile-portrait-1-column.grid-gap-md'],
    },
    {
      name: 'accordion-faq',
      instances: ['main > section:nth-of-type(5) .faq-list'],
    },
    {
      name: 'hero-banner',
      instances: ['section.section.inverse-section .utility-position-relative'],
    },
  ],
  sections: [
    {
      id: 'section-1',
      name: 'Hero',
      selector: 'header.section.secondary-section',
      style: null,
      blocks: ['hero-landing'],
      defaultContent: [],
    },
    {
      id: 'section-2',
      name: 'Featured Article',
      selector: 'main > section:nth-of-type(1)',
      style: null,
      blocks: ['columns-article'],
      defaultContent: [],
    },
    {
      id: 'section-3',
      name: 'Image Gallery',
      selector: 'main > section:nth-of-type(2)',
      style: 'secondary',
      blocks: ['cards-gallery'],
      defaultContent: [
        'main > section:nth-of-type(2) .utility-text-align-center h2',
        'main > section:nth-of-type(2) .utility-text-align-center .paragraph-lg',
      ],
    },
    {
      id: 'section-4',
      name: 'Testimonials Tabs',
      selector: 'main > section:nth-of-type(3)',
      style: null,
      blocks: ['tabs-testimonial'],
      defaultContent: [],
    },
    {
      id: 'section-5',
      name: 'Latest Articles',
      selector: 'main > section:nth-of-type(4)',
      style: 'secondary',
      blocks: ['cards-article'],
      defaultContent: [
        'main > section:nth-of-type(4) .utility-text-align-center h2',
        'main > section:nth-of-type(4) .utility-text-align-center .paragraph-lg',
      ],
    },
    {
      id: 'section-6',
      name: 'FAQ',
      selector: 'main > section:nth-of-type(5)',
      style: null,
      blocks: ['accordion-faq'],
      defaultContent: [
        'main > section:nth-of-type(5) .grid-layout > div:first-child h2',
        'main > section:nth-of-type(5) .grid-layout > div:first-child .subheading',
      ],
    },
    {
      id: 'section-7',
      name: 'CTA Banner',
      selector: 'section.section.inverse-section',
      style: null,
      blocks: ['hero-banner'],
      defaultContent: [],
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

    // 2. Find blocks on page
    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);

    // 3. Parse each block
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
      path,
      report: {
        title: document.title,
        template: PAGE_TEMPLATE.name,
        blocks: pageBlocks.map((b) => b.name),
      },
    }];
  },
};
