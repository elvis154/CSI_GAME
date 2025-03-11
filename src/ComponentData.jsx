// ComponentData.js - Component definitions with numeric IDs for section matching
export const componentData = [
    // Header components
    { id: 'header-1001', type: 'image', label: 'Logo', targetSection: 'header', icon: '🖼️', colorOptions: ['blue', 'red', 'green', 'black'] },
    { id: 'header-1001', type: 'text', label: 'Website Title', targetSection: 'header', icon: 'H1', colorOptions: ['black', 'blue', 'gray', 'red'] },
    { id: 'header-1001', type: 'search', label: 'Search Bar', targetSection: 'header', icon: '🔍', colorOptions: ['white', 'light-gray', 'light-blue'] },
    { id: 'header-1001', type: 'button', label: 'Account Button', targetSection: 'header', icon: '👤', colorOptions: ['blue', 'green', 'red', 'gray'] },
    { id: 'header-1001', type: 'dropdown', label: 'Language Selector', targetSection: 'header', icon: '🌐', colorOptions: ['white', 'blue', 'gray'] },
    
    // Navbar components
    { id: 'navbar-2002', type: 'menu', label: 'Navigation Menu', targetSection: 'navbar', icon: '📋', colorOptions: ['blue', 'black', 'gray', 'green'] },
    { id: 'navbar-2002', type: 'dropdown', label: 'Dropdown Menu', targetSection: 'navbar', icon: '▼', colorOptions: ['blue', 'black', 'white'] },
    { id: 'navbar-2002', type: 'links', label: 'Nav Links', targetSection: 'navbar', icon: '🔗', colorOptions: ['blue', 'black', 'gray', 'red'] },
    { id: 'navbar-2002', type: 'button', label: 'Nav Button', targetSection: 'navbar', icon: '🔘', colorOptions: ['blue', 'green', 'red', 'orange'] },
    { id: 'navbar-2002', type: 'icon', label: 'Nav Icons', targetSection: 'navbar', icon: '★', colorOptions: ['blue', 'black', 'gray', 'white'] },
    
    // Hero components
    { id: 'hero-3003', type: 'heading', label: 'Hero Heading', targetSection: 'hero', icon: 'H1', colorOptions: ['white', 'black', 'blue', 'red'] },
    { id: 'hero-3003', type: 'text', label: 'Hero Subheading', targetSection: 'hero', icon: 'H2', colorOptions: ['gray', 'white', 'black', 'blue'] },
    { id: 'hero-3003', type: 'button', label: 'Call to Action', targetSection: 'hero', icon: '🔘', colorOptions: ['red', 'blue', 'green', 'orange'] },
    { id: 'hero-3003', type: 'image', label: 'Hero Image', targetSection: 'hero', icon: '🖼️', colorOptions: ['full-color', 'grayscale', 'sepia', 'high-contrast'] },
    { id: 'hero-3003', type: 'video', label: 'Hero Video', targetSection: 'hero', icon: '🎬', colorOptions: ['full-color', 'grayscale', 'sepia'] },
    { id: 'hero-3003', type: 'slider', label: 'Hero Slider', targetSection: 'hero', icon: '◀▶', colorOptions: ['multi-color', 'blue-theme', 'red-theme'] },
    
    // Content components
    { id: 'content-4004', type: 'text', label: 'Content Paragraph', targetSection: 'content', icon: '📝', colorOptions: ['black', 'dark-gray', 'dark-blue'] },
    { id: 'content-4004', type: 'image', label: 'Content Image', targetSection: 'content', icon: '🖼️', colorOptions: ['full-color', 'grayscale', 'sepia'] },
    { id: 'content-4004', type: 'video', label: 'Content Video', targetSection: 'content', icon: '🎬', colorOptions: ['standard', 'widescreen', 'square'] },
    { id: 'content-4004', type: 'list', label: 'Bullet List', targetSection: 'content', icon: '•', colorOptions: ['black', 'blue', 'gray'] },
    { id: 'content-4004', type: 'blockquote', label: 'Blockquote', targetSection: 'content', icon: '❝', colorOptions: ['gray', 'light-blue', 'light-yellow'] },
    { id: 'content-4004', type: 'table', label: 'Data Table', targetSection: 'content', icon: '🗓️', colorOptions: ['striped', 'bordered', 'minimal'] },
    { id: 'content-4004', type: 'button', label: 'Content CTA', targetSection: 'content', icon: '🔘', colorOptions: ['blue', 'green', 'red', 'purple'] },
    
    // Sidebar components
    { id: 'sidebar-5005', type: 'widget', label: 'Sidebar Widget', targetSection: 'sidebar', icon: '📦', colorOptions: ['light-gray', 'white', 'light-blue'] },
    { id: 'sidebar-5005', type: 'menu', label: 'Sidebar Nav', targetSection: 'sidebar', icon: '📋', colorOptions: ['gray', 'blue', 'white'] },
    { id: 'sidebar-5005', type: 'search', label: 'Sidebar Search', targetSection: 'sidebar', icon: '🔍', colorOptions: ['white', 'light-gray', 'light-blue'] },
    { id: 'sidebar-5005', type: 'button', label: 'Sidebar CTA', targetSection: 'sidebar', icon: '🔘', colorOptions: ['blue', 'green', 'red', 'orange'] },
    { id: 'sidebar-5005', type: 'social', label: 'Social Links', targetSection: 'sidebar', icon: '👥', colorOptions: ['blue', 'gray', 'colorful'] },
    { id: 'sidebar-5005', type: 'ad', label: 'Advertisement', targetSection: 'sidebar', icon: '📢', colorOptions: ['colorful', 'subtle', 'bold'] },
    
    // Features components
    { id: 'features-6006', type: 'card', label: 'Feature Card', targetSection: 'features', icon: '🃏', colorOptions: ['blue', 'green', 'purple', 'mixed'] },
    { id: 'features-6006', type: 'icon', label: 'Feature Icon', targetSection: 'features', icon: '★', colorOptions: ['blue', 'green', 'red', 'yellow'] },
    { id: 'features-6006', type: 'heading', label: 'Feature Heading', targetSection: 'features', icon: 'H2', colorOptions: ['black', 'blue', 'dark-gray'] },
    { id: 'features-6006', type: 'text', label: 'Feature Text', targetSection: 'features', icon: '📝', colorOptions: ['gray', 'black', 'dark-blue'] },
    { id: 'features-6006', type: 'image', label: 'Feature Image', targetSection: 'features', icon: '🖼️', colorOptions: ['full-color', 'duotone', 'monochrome'] },
    { id: 'features-6006', type: 'grid', label: 'Features Grid', targetSection: 'features', icon: '⊞', colorOptions: ['uniform', 'alternating', 'gradient'] },
    
    // Contact components
    { id: 'contact-7007', type: 'form', label: 'Contact Form', targetSection: 'contact', icon: '📋', colorOptions: ['white', 'light-gray', 'light-blue'] },
    { id: 'contact-7007', type: 'input', label: 'Text Input', targetSection: 'contact', icon: '▭', colorOptions: ['white', 'light-gray', 'light-blue'] },
    { id: 'contact-7007', type: 'textarea', label: 'Text Area', targetSection: 'contact', icon: '☰', colorOptions: ['white', 'light-gray', 'light-blue'] },
    { id: 'contact-7007', type: 'button', label: 'Submit Button', targetSection: 'contact', icon: '✓', colorOptions: ['blue', 'green', 'red', 'black'] },
    { id: 'contact-7007', type: 'text', label: 'Contact Info', targetSection: 'contact', icon: '📝', colorOptions: ['black', 'gray', 'blue'] },
    { id: 'contact-7007', type: 'map', label: 'Location Map', targetSection: 'contact', icon: '🗺️', colorOptions: ['standard', 'satellite', 'dark-mode'] },
    { id: 'contact-7007', type: 'social', label: 'Contact Social', targetSection: 'contact', icon: '👥', colorOptions: ['blue', 'gray', 'colorful'] },
    
    // Footer components
    { id: 'footer-8008', type: 'links', label: 'Footer Links', targetSection: 'footer', icon: '🔗', colorOptions: ['white', 'light-gray', 'blue'] },
    { id: 'footer-8008', type: 'social', label: 'Social Links', targetSection: 'footer', icon: '👥', colorOptions: ['white', 'gray', 'colorful'] },
    { id: 'footer-8008', type: 'image', label: 'Footer Logo', targetSection: 'footer', icon: '🖼️', colorOptions: ['white', 'grayscale', 'color'] },
    { id: 'footer-8008', type: 'text', label: 'Copyright Text', targetSection: 'footer', icon: '©️', colorOptions: ['white', 'light-gray', 'gray'] },
    { id: 'footer-8008', type: 'form', label: 'Newsletter Signup', targetSection: 'footer', icon: '📧', colorOptions: ['white', 'light-gray', 'dark-gray'] },
    { id: 'footer-8008', type: 'menu', label: 'Site Map', targetSection: 'footer', icon: '🗺️', colorOptions: ['white', 'light-gray', 'gray'] },
    { id: 'footer-8008', type: 'icons', label: 'Payment Icons', targetSection: 'footer', icon: '💳', colorOptions: ['grayscale', 'color', 'dark'] },
    { id: 'footer-8008', type: 'dropdown', label: 'Language Switch', targetSection: 'footer', icon: '🌐', colorOptions: ['gray', 'white', 'dark-gray'] },
    { id: 'footer-8008', type: 'links', label: 'Policy Links', targetSection: 'footer', icon: '📜', colorOptions: ['white', 'light-gray', 'gray'] }
];