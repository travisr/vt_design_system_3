module.exports = {
  ci: {
    collect: {
      url: [
        'http://localhost:4200',
        'http://localhost:4200/foundation/colors',
        'http://localhost:4200/foundation/typography',
        'http://localhost:4200/components/buttons',
        'http://localhost:4200/components/form-fields',
      ],
      startServerCommand: 'npm run start',
      startServerReadyPattern: 'Local:.*:4200',
      startServerReadyTimeout: 30000,
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 0.8 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['warn', { minScore: 0.9 }],
        'categories:seo': ['warn', { minScore: 0.8 }],
        
        // Performance metrics
        'first-contentful-paint': ['warn', { maxNumericValue: 2000 }],
        'largest-contentful-paint': ['warn', { maxNumericValue: 3000 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        
        // Accessibility
        'color-contrast': 'error',
        'heading-order': 'error',
        'label': 'error',
        'link-name': 'error',
        
        // Best practices
        'uses-https': 'off', // Not applicable for localhost
        'is-on-https': 'off', // Not applicable for localhost
        
        // Bundle size
        'total-byte-weight': ['warn', { maxNumericValue: 1000000 }], // 1MB
        'unused-javascript': ['warn', { maxNumericValue: 100000 }], // 100KB
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
