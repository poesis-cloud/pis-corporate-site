// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://poesis.cloud',
  integrations: [sitemap()],
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
