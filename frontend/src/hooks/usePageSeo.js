import { useEffect } from 'react';

const DEFAULT_TITLE = 'Velunai | Full-Stack Web Development & Digital Experiences';
const DEFAULT_DESCRIPTION = 'Velunai builds fast, scalable, full-stack web applications — from React frontends to production-ready backends.';

function setMeta(name, content, attr = 'name') {
  let el = document.head.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

/**
 * Sets document.title and the meta description for the current route,
 * and restores the site defaults on unmount. Pass noindex for pages
 * that should never appear in search results (dashboards, admin, etc.)
 */
export default function usePageSeo({ title, description, noindex = false } = {}) {
  useEffect(() => {
    const prevTitle = document.title;
    if (title) document.title = title;
    if (description) setMeta('description', description);
    setMeta('robots', noindex ? 'noindex, nofollow' : 'index, follow');

    return () => {
      document.title = prevTitle;
      setMeta('description', DEFAULT_DESCRIPTION);
      setMeta('robots', 'index, follow');
    };
  }, [title, description, noindex]);
}
