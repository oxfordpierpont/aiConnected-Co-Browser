/**
 * Page Context Extraction
 *
 * Scrapes the current page to provide context to the AI.
 * This runs on the host website and extracts relevant information.
 */

import { PageContext } from './api';

/**
 * Extract context from the current page for AI understanding
 */
export function getPageContext(): PageContext {
  const url = window.location.href;
  const title = document.title || 'Unknown Page';

  // Get all headings to understand page structure
  const headings = Array.from(document.querySelectorAll('h1, h2, h3'))
    .map((h) => (h as HTMLElement).innerText?.replace(/\s+/g, ' ').trim())
    .filter((t) => t && t.length > 0)
    .slice(0, 20); // Limit to prevent huge payloads

  // Get interactive elements (buttons/links) to understand available actions
  const interactables = Array.from(
    document.querySelectorAll('button, a, input[type="submit"], [role="button"]')
  )
    .map((el) => (el as HTMLElement).innerText?.replace(/\s+/g, ' ').trim())
    .filter((t) => t && t.length > 0 && t.length < 50)
    .slice(0, 40);

  // Get main text content (truncated)
  const contentSummary = getMainContent();

  return {
    url,
    title,
    headings,
    interactables,
    contentSummary,
  };
}

/**
 * Extract main content from the page, prioritizing semantic elements
 */
function getMainContent(): string {
  // Try to find main content area first
  const mainContent =
    document.querySelector('main') ||
    document.querySelector('[role="main"]') ||
    document.querySelector('article') ||
    document.querySelector('.content') ||
    document.querySelector('#content') ||
    document.body;

  if (!mainContent) {
    return '';
  }

  // Clone and clean the content
  const clone = mainContent.cloneNode(true) as HTMLElement;

  // Remove elements that don't contain useful content
  const selectorsToRemove = [
    'script',
    'style',
    'nav',
    'header',
    'footer',
    'aside',
    'iframe',
    'noscript',
    '[aria-hidden="true"]',
    '.siteguide-root', // Don't include our own widget
  ];

  selectorsToRemove.forEach((selector) => {
    clone.querySelectorAll(selector).forEach((el) => el.remove());
  });

  // Get text content
  let text = clone.innerText || clone.textContent || '';

  // Clean up whitespace
  text = text.replace(/\s+/g, ' ').trim();

  // Truncate to reasonable size (3000 chars)
  if (text.length > 3000) {
    text = text.substring(0, 3000) + '...';
  }

  return text;
}

/**
 * Find an element on the page by text content
 */
export function findElementByText(text: string): HTMLElement | null {
  const lowerText = text.toLowerCase();

  // Try exact ID match first
  const byId = document.getElementById(text) || document.getElementById(lowerText);
  if (byId) return byId;

  // Try data-siteguide attribute
  const bySiteGuideAttr = document.querySelector(`[data-siteguide="${text}"]`);
  if (bySiteGuideAttr) return bySiteGuideAttr as HTMLElement;

  // Try XPath for text content
  try {
    const xpath = `//*[self::h1 or self::h2 or self::h3 or self::h4 or self::a or self::button or self::span or self::p or self::section][contains(translate(text(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${lowerText}')]`;
    const result = document.evaluate(
      xpath,
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
    );
    if (result.singleNodeValue) {
      return result.singleNodeValue as HTMLElement;
    }
  } catch (err) {
    console.warn('[SiteGuide] XPath error:', err);
  }

  // Fallback: search all elements for matching text
  const allElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, a, button, section, div');
  for (const el of allElements) {
    const elText = (el as HTMLElement).innerText?.toLowerCase();
    if (elText?.includes(lowerText)) {
      return el as HTMLElement;
    }
  }

  return null;
}

/**
 * Scroll to and highlight an element
 */
export function scrollToElement(target: string): boolean {
  const element = findElementByText(target);

  if (!element) {
    console.warn(`[SiteGuide] Could not find element: "${target}"`);
    return false;
  }

  // Scroll into view
  element.scrollIntoView({ behavior: 'smooth', block: 'center' });

  // Apply highlight effect
  highlightElement(element);

  return true;
}

/**
 * Highlight an element temporarily
 */
export function highlightElement(element: HTMLElement, duration = 2500): void {
  // Store original styles
  const originalStyles = {
    transition: element.style.transition,
    boxShadow: element.style.boxShadow,
    zIndex: element.style.zIndex,
    position: element.style.position,
  };

  // Apply highlight
  element.style.transition = 'all 0.5s ease';
  element.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.6), 0 0 20px rgba(59, 130, 246, 0.4)';
  element.style.zIndex = '100';
  if (getComputedStyle(element).position === 'static') {
    element.style.position = 'relative';
  }

  // Remove highlight after duration
  setTimeout(() => {
    element.style.transition = originalStyles.transition;
    element.style.boxShadow = originalStyles.boxShadow;
    element.style.zIndex = originalStyles.zIndex;
    element.style.position = originalStyles.position;
  }, duration);
}

/**
 * Click an element
 */
export function clickElement(target: string): boolean {
  const element = findElementByText(target);

  if (!element) {
    console.warn(`[SiteGuide] Could not find element to click: "${target}"`);
    return false;
  }

  // Scroll into view first
  element.scrollIntoView({ behavior: 'smooth', block: 'center' });

  // Highlight briefly then click
  highlightElement(element, 1000);

  setTimeout(() => {
    element.click();
  }, 500);

  return true;
}
