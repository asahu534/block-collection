/* eslint-disable */
/* global WebImporter */
/** Parser for tabs-testimonial. Base: tabs. Source: https://wknd-trendsetters.site. */
export default function parse(element, { document }) {
  // Tabs testimonial: 4 tab panels with person image, name, role, quote
  // Source DOM: .tabs-wrapper with .tabs-content > .tab-pane children and .tab-menu > button children
  // Container block: each row = one tab, col1 = tab label (title), col2 = tab content
  // Model fields: title (col1), content_heading + content_image + content_richtext (col2 grouped)
  // Skip title field hint (collapsed suffix rule) — actually "title" doesn't end with Title/Type/etc suffix, so hint IS needed

  const tabPanes = element.querySelectorAll('.tab-pane');
  const tabButtons = element.querySelectorAll('.tab-menu-link, .tab-menu button');
  const cells = [];

  tabPanes.forEach((pane, i) => {
    // Col 1: tab label (person name from tab button)
    const titleFrag = document.createDocumentFragment();
    titleFrag.appendChild(document.createComment(' field:title '));
    const btn = tabButtons[i];
    if (btn) {
      const nameEl = btn.querySelector('strong');
      if (nameEl) {
        titleFrag.appendChild(document.createTextNode(nameEl.textContent));
      } else {
        titleFrag.appendChild(document.createTextNode(btn.textContent.trim()));
      }
    }

    // Col 2: tab content — fields must follow model order: content_heading, content_image, content_richtext
    const contentFrag = document.createDocumentFragment();
    const img = pane.querySelector('img, picture');
    const name = pane.querySelector('.paragraph-xl strong, strong');
    const role = pane.querySelector('.paragraph-xl + div, div:not(.grid-layout):not(.paragraph-xl)');
    const quote = pane.querySelector('p.paragraph-xl');

    // 1. content_heading (model field order: first)
    if (name) {
      contentFrag.appendChild(document.createComment(' field:content_heading '));
      const h3 = document.createElement('h3');
      h3.textContent = name.textContent;
      contentFrag.appendChild(h3);
    }
    // skip content_headingType — collapsed (Type suffix)

    // 2. content_image (model field order: second)
    if (img) {
      contentFrag.appendChild(document.createComment(' field:content_image '));
      contentFrag.appendChild(img);
    }

    // 3. content_richtext (model field order: third)
    contentFrag.appendChild(document.createComment(' field:content_richtext '));
    if (role && role.textContent.trim() && !role.querySelector('strong')) {
      const p = document.createElement('p');
      p.textContent = role.textContent.trim();
      contentFrag.appendChild(p);
    }
    if (quote) contentFrag.appendChild(quote);

    cells.push([titleFrag, contentFrag]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'tabs-testimonial', cells });
  element.replaceWith(block);
}
