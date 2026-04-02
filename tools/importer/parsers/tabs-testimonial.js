/* eslint-disable */
/* global WebImporter */
/**
 * Parser for tabs-testimonial. Base: tabs.
 * Source: https://wknd-trendsetters.site (section 4 testimonials)
 * Model fields per tab item: title (text), content_heading (text),
 *   content_headingType (collapsed), content_image (reference), content_richtext (richtext)
 * → 1 row per tab: [title | content (heading + image + richtext grouped)]
 */
export default function parse(element, { document }) {
  // Tab panes contain the content
  const tabPanes = element.querySelectorAll('.tab-pane');
  // Tab menu buttons contain the titles
  const tabButtons = element.querySelectorAll('.tab-menu-link, .tab-menu button');

  const cells = [];

  tabPanes.forEach((pane, i) => {
    // Cell 1: Tab title (person name)
    const titleFrag = document.createDocumentFragment();
    titleFrag.appendChild(document.createComment(' field:title '));
    const nameEl = pane.querySelector('.paragraph-xl strong, strong');
    const titleText = nameEl ? nameEl.textContent.trim() : `Tab ${i + 1}`;
    titleFrag.appendChild(document.createTextNode(titleText));

    // Cell 2: Content (grouped content_ fields)
    const contentFrag = document.createDocumentFragment();

    // content_image
    const img = pane.querySelector('img.cover-image, img');
    if (img) {
      contentFrag.appendChild(document.createComment(' field:content_image '));
      const pic = img.closest('picture') || img;
      contentFrag.appendChild(pic);
    }

    // content_heading (person name + role as heading)
    const personName = pane.querySelector('.paragraph-xl strong, strong');
    const role = pane.querySelector('.paragraph-xl + div, .paragraph-xl ~ div:not(.paragraph-xl)');
    if (personName) {
      contentFrag.appendChild(document.createComment(' field:content_heading '));
      const h3 = document.createElement('h3');
      h3.textContent = personName.textContent.trim();
      contentFrag.appendChild(h3);
    }

    // content_richtext (quote + role)
    const quote = pane.querySelector('p.paragraph-xl, .grid-layout > div:last-child > p');
    contentFrag.appendChild(document.createComment(' field:content_richtext '));
    if (role) {
      const roleP = document.createElement('p');
      roleP.textContent = role.textContent.trim();
      contentFrag.appendChild(roleP);
    }
    if (quote) {
      contentFrag.appendChild(quote);
    }

    cells.push([titleFrag, contentFrag]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'tabs-testimonial', cells });
  element.replaceWith(block);
}
