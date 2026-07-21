import React, { useEffect } from 'react';

export default function SEOHead({ title, description, product, breadcrumbs }) {
  useEffect(() => {
    // 1. Update Document Title
    if (title) {
      document.title = title;
    }

    // 2. Update Meta Description
    if (description) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', description);
      }
    }

    // 3. Inject Dynamic JSON-LD Schema Script
    const existingScript = document.getElementById('dynamic-json-ld');
    if (existingScript) {
      existingScript.remove();
    }

    if (product) {
      const productSchema = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        'name': product.name,
        'image': product.images,
        'description': product.description,
        'sku': product.id,
        'brand': {
          '@type': 'Brand',
          'name': 'Azteca Football'
        },
        'offers': {
          '@type': 'Offer',
          'url': window.location.href,
          'priceCurrency': 'MXN',
          'price': product.price,
          'itemCondition': 'https://schema.org/NewCondition',
          'availability': product.inStockSizes && product.inStockSizes.length > 0
            ? 'https://schema.org/InStock'
            : 'https://schema.org/OutOfStock',
          'seller': {
            '@type': 'Organization',
            'name': 'Azteca Football Premium Store'
          }
        },
        'aggregateRating': {
          '@type': 'AggregateRating',
          'ratingValue': product.rating || 4.9,
          'reviewCount': product.reviewsCount || 100
        }
      };

      const script = document.createElement('script');
      script.id = 'dynamic-json-ld';
      script.type = 'application/ld+json';
      script.innerHTML = JSON.stringify(productSchema);
      document.head.appendChild(script);
    }
  }, [title, description, product]);

  return null;
}
