// ComponentData.js - Extended component definitions with unique IDs and variations
export const componentData = [
    // 1. Header Components
    { id: 'header-1001', type: 'header', label: 'Standard Header', targetSection: 'header', icon: '🖼️', variant: 'default', imagePath: '/images/headers/header-default.png' },
    { id: 'header-1002', type: 'header', label: 'Dark Mode Header', targetSection: 'header', icon: '🖼️', variant: 'dark', imagePath: '/images/headers/header-dark.png' },
    { id: 'header-1003', type: 'header', label: 'Light Mode Header', targetSection: 'header', icon: '🖼️', variant: 'light', imagePath: '/images/headers/header-light.png' },
    
    // 2. Navbar Components
    { id: 'navbar-2001', type: 'navbar', label: 'Blue Navbar', targetSection: 'navbar', icon: '📋', variant: 'blue', imagePath: '/images/navbars/navbar-blue.png' },
    { id: 'navbar-2002', type: 'navbar', label: 'Green Navbar', targetSection: 'navbar', icon: '📋', variant: 'green', imagePath: '/images/navbars/navbar-green.png' },
    { id: 'navbar-2003', type: 'navbar', label: 'Red Navbar', targetSection: 'navbar', icon: '📋', variant: 'red', imagePath: '/images/navbars/navbar-red.png' },
    
    // 3. Hero Section Components
    { id: 'hero-3001', type: 'hero', label: 'Gradient Hero', targetSection: 'hero', icon: '🎭', variant: 'gradient', imagePath: '/images/heroes/hero-gradient.png' },
    { id: 'hero-3002', type: 'hero', label: 'Solid Color Hero', targetSection: 'hero', icon: '🎭', variant: 'solid', imagePath: '/images/heroes/hero-solid.png' },
    { id: 'hero-3003', type: 'hero', label: 'Image Background Hero', targetSection: 'hero', icon: '🎭', variant: 'image', imagePath: '/images/heroes/hero-image.png' },
    
    // 4. Content Section Components
    { id: 'content-4001', type: 'content', label: 'Light Content Section', targetSection: 'content', icon: '📝', variant: 'light', imagePath: '/images/content/content-light.png' },
    { id: 'content-4002', type: 'content', label: 'Dark Content Section', targetSection: 'content', icon: '📝', variant: 'dark', imagePath: '/images/content/content-dark.png' },
    { id: 'content-4003', type: 'content', label: 'Accent Content Section', targetSection: 'content', icon: '📝', variant: 'accent', imagePath: '/images/content/content-accent.png' },
    
    // 5. Sidebar Components
    { id: 'sidebar-5001', type: 'sidebar', label: 'Left Sidebar', targetSection: 'sidebar', icon: '📑', variant: 'left', imagePath: '/images/sidebars/sidebar-left.png' },
    { id: 'sidebar-5002', type: 'sidebar', label: 'Right Sidebar', targetSection: 'sidebar', icon: '📑', variant: 'right', imagePath: '/images/sidebars/sidebar-right.png' },
    { id: 'sidebar-5003', type: 'sidebar', label: 'Transparent Sidebar', targetSection: 'sidebar', icon: '📑', variant: 'transparent', imagePath: '/images/sidebars/sidebar-transparent.png' },
    
    // 6. Features Section Components
    { id: 'features-6001', type: 'features', label: 'Grid Features Layout', targetSection: 'features', icon: '⊞', variant: 'grid', imagePath: '/images/features/features-grid.png' },
    { id: 'features-6002', type: 'features', label: 'List Features Layout', targetSection: 'features', icon: '⊞', variant: 'list', imagePath: '/images/features/features-list.png' },
    { id: 'features-6003', type: 'features', label: 'Highlighted Features', targetSection: 'features', icon: '⊞', variant: 'highlighted', imagePath: '/images/features/features-highlighted.png' },
    
    // 7. Contact Form Components
    { id: 'contact-7001', type: 'contact', label: 'Minimalist Contact Form', targetSection: 'contact', icon: '✉️', variant: 'simple', imagePath: '/images/contact/contact-simple.png' },
    { id: 'contact-7002', type: 'contact', label: 'Bordered Contact Form', targetSection: 'contact', icon: '✉️', variant: 'bordered', imagePath: '/images/contact/contact-bordered.png' },
    { id: 'contact-7003', type: 'contact', label: 'Colorful Contact Form', targetSection: 'contact', icon: '✉️', variant: 'colorful', imagePath: '/images/contact/contact-colorful.png' },
    
    // 8. Footer Components
    { id: 'footer-8001', type: 'footer', label: 'Dark Footer', targetSection: 'footer', icon: '🏷️', variant: 'dark', imagePath: '/images/footers/footer-dark.png' },
    { id: 'footer-8002', type: 'footer', label: 'Light Footer', targetSection: 'footer', icon: '🏷️', variant: 'light', imagePath: '/images/footers/footer-light.png' },
    { id: 'footer-8003', type: 'footer', label: 'Minimal Footer', targetSection: 'footer', icon: '🏷️', variant: 'minimal', imagePath: '/images/footers/footer-minimal.png' },
    
    // 9. CTA Button Components
    { id: 'cta-9001', type: 'cta', label: 'Blue CTA Button', targetSection: 'cta', icon: '🔘', variant: 'blue', imagePath: '/images/cta/cta-blue.png' },
    { id: 'cta-9002', type: 'cta', label: 'Green CTA Button', targetSection: 'cta', icon: '🔘', variant: 'green', imagePath: '/images/cta/cta-green.png' },
    { id: 'cta-9003', type: 'cta', label: 'Red CTA Button', targetSection: 'cta', icon: '🔘', variant: 'red', imagePath: '/images/cta/cta-red.png' },
    
    // 10. Pricing Table Components
    { id: 'pricing-10001', type: 'pricing', label: 'Standard Pricing Table', targetSection: 'pricing', icon: '💰', variant: 'standard', imagePath: '/images/pricing/pricing-standard.png' },
    { id: 'pricing-10002', type: 'pricing', label: 'Highlighted Pricing Table', targetSection: 'pricing', icon: '💰', variant: 'highlighted', imagePath: '/images/pricing/pricing-highlighted.png' },
    { id: 'pricing-10003', type: 'pricing', label: 'Dark Mode Pricing Table', targetSection: 'pricing', icon: '💰', variant: 'dark', imagePath: '/images/pricing/pricing-dark.png' },
    
    // 11. Testimonials Section Components
    { id: 'testimonials-11001', type: 'testimonials', label: 'Testimonials Carousel', targetSection: 'testimonials', icon: '💬', variant: 'carousel', imagePath: '/images/testimonials/testimonials-carousel.png' },
    { id: 'testimonials-11002', type: 'testimonials', label: 'Testimonials Grid', targetSection: 'testimonials', icon: '💬', variant: 'grid', imagePath: '/images/testimonials/testimonials-grid.png' },
    { id: 'testimonials-11003', type: 'testimonials', label: 'Single Testimonial', targetSection: 'testimonials', icon: '💬', variant: 'single', imagePath: '/images/testimonials/testimonials-single.png' },
    
    // 12. Subscription Form Components
    { id: 'subscription-12001', type: 'subscription', label: 'Dark Subscription Form', targetSection: 'subscription', icon: '📧', variant: 'dark', imagePath: '/images/subscription/subscription-dark.png' },
    { id: 'subscription-12002', type: 'subscription', label: 'Light Subscription Form', targetSection: 'subscription', icon: '📧', variant: 'light', imagePath: '/images/subscription/subscription-light.png' },
    { id: 'subscription-12003', type: 'subscription', label: 'Bordered Subscription Form', targetSection: 'subscription', icon: '📧', variant: 'bordered', imagePath: '/images/subscription/subscription-bordered.png' },
    
    // 13. Image Gallery/Carousel Components
    { id: 'gallery-13001', type: 'gallery', label: 'Grid Gallery', targetSection: 'gallery', icon: '🖼️', variant: 'grid', imagePath: '/images/gallery/gallery-grid.png' },
    { id: 'gallery-13002', type: 'gallery', label: 'Carousel Gallery', targetSection: 'gallery', icon: '🖼️', variant: 'carousel', imagePath: '/images/gallery/gallery-carousel.png' },
    { id: 'gallery-13003', type: 'gallery', label: 'Masonry Gallery', targetSection: 'gallery', icon: '🖼️', variant: 'masonry', imagePath: '/images/gallery/gallery-masonry.png' },
    
    // 14. FAQ Section Components
    { id: 'faq-14001', type: 'faq', label: 'Accordion FAQ', targetSection: 'faq', icon: '❓', variant: 'accordion', imagePath: '/images/faq/faq-accordion.png' },
    { id: 'faq-14002', type: 'faq', label: 'List FAQ', targetSection: 'faq', icon: '❓', variant: 'list', imagePath: '/images/faq/faq-list.png' },
    { id: 'faq-14003', type: 'faq', label: 'Grid FAQ', targetSection: 'faq', icon: '❓', variant: 'grid', imagePath: '/images/faq/faq-grid.png' },
    
    // 15. Social Media Links Components
    { id: 'social-15001', type: 'social', label: 'Colored Social Icons', targetSection: 'social', icon: '👥', variant: 'colored', imagePath: '/images/social/social-icons-colored.png' },
    { id: 'social-15002', type: 'social', label: 'Black Social Icons', targetSection: 'social', icon: '👥', variant: 'black', imagePath: '/images/social/social-icons-black.png' },
    { id: 'social-15003', type: 'social', label: 'Minimal Social Icons', targetSection: 'social', icon: '👥', variant: 'minimal', imagePath: '/images/social/social-icons-minimal.png' },
    
    // 16. Newsletter Signup Components
    { id: 'newsletter-16001', type: 'newsletter', label: 'Simple Newsletter', targetSection: 'newsletter', icon: '📮', variant: 'simple', imagePath: '/images/newsletter/newsletter-simple.png' },
    { id: 'newsletter-16002', type: 'newsletter', label: 'Popup Newsletter', targetSection: 'newsletter', icon: '📮', variant: 'popup', imagePath: '/images/newsletter/newsletter-popup.png' },
    { id: 'newsletter-16003', type: 'newsletter', label: 'Inline Newsletter', targetSection: 'newsletter', icon: '📮', variant: 'inline', imagePath: '/images/newsletter/newsletter-inline.png' },
    
    // 17. Team Members Section Components
    { id: 'team-17001', type: 'team', label: 'Team Grid', targetSection: 'team', icon: '👥', variant: 'grid', imagePath: '/images/team/team-grid.png' },
    { id: 'team-17002', type: 'team', label: 'Team Carousel', targetSection: 'team', icon: '👥', variant: 'carousel', imagePath: '/images/team/team-carousel.png' },
    { id: 'team-17003', type: 'team', label: 'Team List', targetSection: 'team', icon: '👥', variant: 'list', imagePath: '/images/team/team-list.png' }
];