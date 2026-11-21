// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { knowledgeContext } from './src/data/knowledge.ts';
import { publishedCaseStudies } from './src/data/case-studies.ts';

/**
 * The sitemap lists what search engines are invited to index, and nothing else:
 * archived offers and, while it has no case to show, the case-study register
 * carry a `noindex` directive (see BaseLayout) and are left out here. A test
 * checks that the two lists agree.
 */
const inSitemap = (page) => {
  const { pathname } = new URL(page);
  if (knowledgeContext(pathname).archive) return false;
  if (pathname.startsWith('/case-studies/') && publishedCaseStudies.length === 0) return false;
  return true;
};

// https://astro.build/config
export default defineConfig({
  site: 'https://poesis.cloud',
  integrations: [sitemap({ filter: inSitemap })],
  redirects: {
    '/insights/itip-compliance-proof': '/insights/continuous-regulatory-compliance',
    '/solutions/itip': '/solutions/oip',
    '/solutions/itip/products/web-application': '/solutions/oip/products/web-application',
    '/solutions/itip/products/definition-blackboard-code-sourcer': '/solutions/sis/products/code-sourcer',
    '/solutions/sie/products/definition-blackboard-manager': '/solutions/sis/products/blackboard-manager',
    '/actors': '/catalog/actors',
    '/affordances': '/catalog/affordances',
    '/capabilities': '/catalog/capabilities',
    '/features': '/catalog/features',
    '/pains': '/catalog/pains',
    '/products': '/catalog/products',
    '/qualities': '/catalog/qualities',
    '/services': '/catalog/services',
    '/services/consulting': '/services/agentic-transformation',
    '/services/saas': '/catalog/services',
    '/services/on-prem-integration-administration': '/catalog/services',
    '/services/certification': '/services/gsm-certification',
    '/services/itip-saas': '/services/oip-saas',
    '/solutions': '/catalog/solutions',
    '/usage': '/catalog/usage',
    '/values': '/catalog/values',
  },
});
