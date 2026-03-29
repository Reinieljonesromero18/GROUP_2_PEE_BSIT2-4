# The Digital Green Journal - Complete Setup Guide

## 📚 Project Overview

**The Digital Green Journal** is a fully-featured Angular 21 blog application focused on environmental issues affecting the world and the Philippines. Built with Tailwind CSS for modern, responsive design.

## 📂 Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── navbar/
│   │   │   ├── navbar.ts          # Navigation component with responsive menu
│   │   │   ├── navbar.html        # Navbar template
│   │   │   └── navbar.css         # Navbar styles
│   │   ├── footer/
│   │   │   ├── footer.ts          # Footer component
│   │   │   ├── footer.html        # Footer template
│   │   │   └── footer.css         # Footer styles
│   │   ├── blog-card/
│   │   │   ├── blog-card.ts       # Reusable blog post card
│   │   │   ├── blog-card.html     # Blog card template
│   │   │   └── blog-card.css      # Blog card styles
│   │   └── post-layout/
│   │       ├── post-layout.ts     # Full blog post layout
│   │       ├── post-layout.html   # Post layout template
│   │       └── post-layout.css    # Post layout styles
│   ├── pages/
│   │   ├── home/
│   │   │   ├── home.ts            # Home/blog listing page
│   │   │   ├── home.html          # Home template
│   │   │   └── home.css           # Home styles
│   │   ├── blog-post/
│   │   │   ├── blog-post.ts       # Single blog post view
│   │   │   ├── blog-post.html     # Blog post template
│   │   │   └── blog-post.css      # Blog post styles
│   │   ├── about/
│   │   │   ├── about.ts           # About page
│   │   │   ├── about.html         # About template
│   │   │   └── about.css          # About styles
│   │   └── references/
│   │       ├── references.ts      # References/sources page
│   │       ├── references.html    # References template
│   │       └── references.css     # References styles
│   ├── services/
│   │   └── blog.service.ts        # Blog data service with business logic
│   ├── models/
│   │   └── blog.model.ts          # TypeScript interfaces for blog data
│   ├── app.ts                     # Root component
│   ├── app.html                   # Root template
│   ├── app.css                    # Root styles (Tailwind CSS)
│   └── app.routes.ts              # Route configuration
├── styles.css                     # Global styles (Tailwind imports)
├── index.html                     # HTML entry point
└── main.ts                        # Application bootstrap
tailwind.config.js                # Tailwind CSS configuration
```

## 🎯 Key Features

### Components
1. **Navbar** - Responsive navigation with mobile menu
2. **Footer** - Site footer with links and copyright
3. **Blog Card** - Reusable card component for displaying blog post previews
4. **Post Layout** - Full-featured blog post layout with sections and references

### Pages
1. **Home** - Landing page with featured posts and recent articles
2. **Blog Post** - Single post view with full content, examples, and references
3. **About** - Project information and mission statement
4. **References** - Comprehensive list of sources and citations

### Services
- **BlogService** - Manages blog post data, provides queries, and filters

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- Angular CLI 21+

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm start

# Application runs on http://localhost:4200
```

### Build for Production

```bash
npm run build
```

## 📝 Adding New Blog Posts

### Step 1: Create the Blog Post Data

Edit `src/app/services/blog.service.ts` and add a new post object to the `initializeBlogPosts()` method:

```typescript
{
  id: '6',
  title: 'Your New Blog Post Title',
  slug: 'your-new-blog-post-slug',
  category: 'Category Name',
  excerpt: 'Brief summary of the post...',
  content: 'Introduction paragraph...',
  author: 'The Digital Green Journal',
  date: '2024-03-15',
  readTime: 7,
  imageUrl: 'https://images.unsplash.com/photo-xxx?w=500&h=300&fit=crop',
  sections: [
    {
      heading: 'First Section',
      content: 'Content for the first section...',
      subsections: [
        {
          title: 'Subsection Title',
          text: 'Detailed explanation...',
          examples: ['Example 1', 'Example 2']
        }
      ]
    }
  ],
  references: [
    {
      title: 'Reference Title',
      url: 'https://example.com'
    }
  ]
}
```

### Step 2: Upload Hero Image

Use images from:
- [Unsplash](https://unsplash.com)
- [Pexels](https://www.pexels.com)
- [Pixabay](https://pixabay.com)

Update the `imageUrl` field with the image URL.

## 🎨 Styling with Tailwind CSS

All components use Tailwind CSS utility classes. Key colors used:

- **Green Colors**: Environmental theme (green-600 primary)
- **Gray Colors**: Text and backgrounds
- **Blue Colors**: Accents and secondary elements

### Common Tailwind Classes Used

```html
<!-- Spacing -->
<div class="p-6 mb-8 mt-4"></div>

<!-- Colors -->
<div class="bg-green-600 text-white"></div>

<!-- Responsive -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"></div>

<!-- Shadows & Hover -->
<div class="shadow-lg hover:shadow-xl transition"></div>
```

## 📱 Responsive Design

The application is fully responsive:
- **Mobile** (< 640px) - Single column, touch-friendly
- **Tablet** (640px - 1024px) - Two column layout
- **Desktop** (> 1024px) - Three column grid for blog cards

## 🔧 Configuration Files

### tailwind.config.js
Tailwind configuration with color customization and content paths.

### app.routes.ts
Angular routing configuration:
- `/` - Home page
- `/post/:slug` - Individual blog post
- `/about` - About page
- `/references` - References page
- `/blog` - Blog archive (same as home)

### tsconfig.json
TypeScript strict mode enabled for type safety.

## 📊 Blog Post Data Structure

```typescript
interface BlogPost {
  id: string;                    // Unique identifier
  title: string;                 // Post title
  slug: string;                  // URL-friendly slug
  category: string;              // Category/topic
  excerpt: string;               // Short summary
  content: string;               // Introduction
  author: string;                // Author name
  date: string;                  // Publication date (YYYY-MM-DD)
  readTime: number;              // Minutes to read
  imageUrl: string;              // Hero image URL
  sections: PostSection[];       // Main content sections
  references: Reference[];       // Sources
}

interface PostSection {
  heading: string;               // Section title
  content: string;               // Section content
  subsections?: SubSection[];    // Optional subsections
}

interface SubSection {
  title: string;                 // Subsection title
  text: string;                  // Subsection content
  examples?: string[];           // Optional examples
}

interface Reference {
  title: string;                 // Source title
  url: string;                   // Source URL
}
```

## 🔍 Content Categories

Current blog post categories:

- **Climate**: Global warming and climate-related topics
- **Environment**: General environmental issues
- **Conservation**: Biodiversity and ecosystem conservation
- **Philippines**: Philippines-specific environmental concerns
- **Sustainability**: Sustainable practices and the 5Rs

## 🌐 Navigation Flow

```
┌─────────────────────────────────────────┐
│       The Digital Green Journal          │
│  (Navbar with responsive menu)          │
└─────────────────────────────────────────┘
                   │
    ┌──────────────┼──────────────┐
    │              │              │
  Home          About       References
   │              │              │
   ├─ Featured    │        [References by
   │   Posts      │         Category]
   │              │
   ├─ Recent    [Project Purpose]
   │  Articles   [Values]
   │            [Team]
   ├─ All Posts
   │
   └─ Blog Cards
        │
        └─ Individual Post Page
              │
              ├─ Full Content
              ├─ Sections
              ├─ References
              └─ Related Posts
        
┌─────────────────────────────────────────┐
│  Footer (Contact, Links, Social)        │
└─────────────────────────────────────────┘
```

## 🎯 Features by Component

### NavBar Component
- **Mobile Responsive**: Hamburger menu on small screens
- **Active Link Highlighting**: Current page indicator
- **Quick Navigation**: Links to all main sections

### Home Page
- Hero section introducing the blog
- Mission statement cards
- Featured post showcase
- Grid of recent articles
- Call-to-action sections

### Blog Post Page
- Hero image with overlay  
- Post metadata (date, author, read time)
- Sectioned content with subsections
- Examples highlighting feature
- References with external links
- Related posts sidebar

### About Page
- Project purpose explanation
- Why this project matters
- Core values
- Topics covered
- Team roles

### References Page
- Key organizations list
- References grouped by category
- Source links and descriptions

## 📚 Adding Images

### Recommended Sources
1. **Unsplash** - High-quality free images
   ```
   https://images.unsplash.com/photo-[ID]?w=500&h=300&fit=crop
   ```

2. **Pexels** - Free stock photos
3. **Pixabay** - Royalty-free images

### Image Optimization
- Use query parameters for sizing: `?w=500&h=300&fit=crop`
- All images use Angular's `NgOptimizedImage` directive
- Responsive image serving with srcset

## 🔐 Best Practices

### Data Management
- All blog data is managed in `BlogService`
- Use signals for reactive state management
- Implement proper TypeScript typing

### Performance
- Lazy load routes for better performance
- Use OnPush change detection strategy
- Optimize images with appropriate sizes

### Accessibility
- Semantic HTML elements
- Proper heading hierarchy
- Alt text for images
- Keyboard navigation support

### SEO
- Semantic content structure
- Meta descriptions in excerpts
- Proper heading usage

## 🚢 Deployment

### Build for Production

```bash
ng build --configuration production
```

Output directory: `dist/PEE_P3_Project`

### Deploy to

- **Vercel** - Recommended for Angular SSR apps
- **Netlify** - Great static site hosting
- **Firebase** - Integrated with Angular projects
- **Azure Static Web Apps** - Microsoft's solution

## 📞 Troubleshooting

### Port Already in Use
```bash
ng serve --port 4201
```

### Clear Cache
```bash
rm -rf node_modules package-lock.json
npm install
```

### Tailwind Styles Not Showing
- Ensure `tailwind.config.js` content paths are correct
- Rebuild the application
- Clear browser cache

## 📖 Resources

- [Angular Documentation](https://angular.dev)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Web Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

## ✨ Future Enhancements

- [ ] Search functionality
- [ ] Blog post comments section
- [ ] User authentication
- [ ] Admin dashboard
- [ ] Newsletter subscription
- [ ] Social media sharing
- [ ] Dark mode toggle
- [ ] Theme customization

---

**Created**: 2024
**Technology**: Angular 21, Tailwind CSS, TypeScript
**License**: Open Source
