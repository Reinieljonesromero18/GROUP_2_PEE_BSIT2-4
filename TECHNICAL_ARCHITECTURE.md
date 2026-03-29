# 🏗️ The Digital Green Journal - Technical Architecture

## System Architecture Overview

```
┌────────────────────────────────────────────────────────────────┐
│                    Application Root (app.ts)                   │
│                                                                │
│  └─ Imports: NavbarComponent, FooterComponent, RouterOutlet   │
└────────────────────────────────────────────────────────────────┘
                              │
                    ┌─────────┴─────────┐
                    │                   │
          ┌─────────▼──────────┐  ┌────▼──────────┐
          │  NavbarComponent   │  │  RouterOutlet │
          │  (Sticky Top)      │  │ (Page Content)│
          └────────────────────┘  └────┬──────────┘
                    │                   │
                    │        ┌──────────┼──────────┬────────────┐
                    │        │          │          │            │
            ┌───────┴─┐  ┌──▼──┐   ┌──▼──┐   ┌───▼───┐   ┌────▼─────┐
            │ Links  │  │Home │   │Post │   │About │   │References│
            │to All  │  │Page │   │Page │   │Page  │   │  Page    │
            │Pages   │  └─────┘   └─────┘   └──────┘   └──────────┘
            │        │      │         │
            └────────┘      │         │
                     ┌──────┴─────────┘
                     │
            ┌────────▼────────┐
            │  BlogService    │
            │  (Data Layer)   │
            └─────────────────┘
                     │
            ┌────────▼────────┐
            │  Blog Data      │
            │  5 Posts        │
            │  + References   │
            └─────────────────┘
                     
            ┌────────────────┐
            │  Footer        │
            │  (Sticky Bottom)│
            └────────────────┘
```

---

## Data Flow Architecture

```
┌─────────────────────────────────────┐
│    blog.service.ts                  │
│  (BlogService Class)                │
│                                     │
│  - blogPosts: Signal<BlogPost[]>   │
│  - getAllPosts()                   │
│  - getPostBySlug(slug)             │
│  - getPostsByCategory(category)    │
│  - getRecentPosts(count)           │
│  - getCategories()                 │
└──────────────┬──────────────────────┘
               │
               ├─ Provides to HomeComponent
               │  ├─ allPosts
               │  └─ recentPosts
               │
               ├─ Provides to BlogPostComponent
               │  ├─ post (by slug)
               │  └─ relatedPosts
               │
               ├─ Provides to ReferencesComponent
               │  ├─ allPosts (for references)
               │  └─ getCategories()
               │
               └─ Data from blog.model.ts
                  ├─ BlogPost interface
                  ├─ PostSection interface
                  ├─ SubSection interface
                  └─ Reference interface
```

---

## Component Hierarchy Tree

```
App (Root)
│
├── NavbarComponent
│   └── Navigation Links
│       ├─ Home (/)
│       ├─ Blog (/blog)
│       ├─ About (/about)
│       └─ References (/references)
│
├── Router Outlet
│   │
│   ├── HomeComponent/
│   │   ├── Hero Section
│   │   ├── Featured Post
│   │   ├── Recent Posts (3)
│   │   ├── Blog Card Grid (All posts)
│   │   │   └─ BlogCardComponent (Repeating)
│   │   │      ├─ Image
│   │   │      ├─ Category Badge
│   │   │      ├─ Title & Excerpt
│   │   │      └─ Read More Button
│   │   └── CTAs
│   │
│   ├── BlogPostComponent/
│   │   ├── Post Lookup (by slug)
│   │   │   └─ BlogService.getPostBySlug()
│   │   ├── PostLayoutComponent
│   │   │   ├── Hero Image
│   │   │   ├── Title & Meta
│   │   │   └── Content Sections (Dynamic)
│   │   │       ├─ Heading
│   │   │       ├─ Content
│   │   │       └─ Subsections
│   │   ├── Navigation Links
│   │   └── Related Posts
│   │       └─ BlogCardComponent (x3)
│   │
│   ├── AboutComponent/
│   │   ├── Project Purpose
│   │   ├── Why This Project
│   │   ├── Values Section
│   │   ├── Topics Covered
│   │   ├── Team Roles
│   │   └── CTA
│   │
│   └── ReferencesComponent/
│       ├── About Sources
│       ├── Key Organizations
│       │   └─ Link Tiles
│       ├── References by Category
│       │   └─ Dynamic Category Sections
│       ├── Additional Resources
│       └── Citation Guidelines
│
└── FooterComponent
    └── Footer Content
        ├─ About Section
        ├─ Quick Links
        ├─ CTA
        ├─ Copyright
        └─ Social Links
```

---

## Routing Architecture

```
app.routes.ts
│
├─ Path: ''
│  Component: HomeComponent
│  Display: Blog listing with all posts
│
├─ Path: 'blog'
│  Redirects to: HomeComponent
│  Display: Same as home (alias)
│
├─ Path: 'post/:slug'
│  Component: BlogPostComponent
│  Params: 
│    - slug: string (unique identifier)
│  Resolver: 
│    - ActivatedRoute snapshots slug from URL
│    - Passes to BlogService.getPostBySlug()
│    - Template receives post via signal
│  Display: Individual blog post full content
│
├─ Path: 'about'
│  Component: AboutComponent
│  Display: Static about/info page
│
├─ Path: 'references'
│  Component: ReferencesComponent
│  Display: References organized by category
│
└─ Path: '**' (Wildcard)
   Redirect to: ''
   Display: Home page (404 fallback)
```

---

## Data Model Structure

```typescript
// blog.model.ts

BlogPost {
  id: string;                    // Unique post ID
  title: string;                 // Post title
  slug: string;                  // URL slug (from /post/slug)
  category: string;              // For filtering
  excerpt: string;               // Preview text
  content: string;               // Opening paragraph
  author: string;                // Author name
  date: string;                  // YYYY-MM-DD format
  readTime: number;              // Minutes
  imageUrl: string;              // Featured image
  sections: PostSection[];       // Main content
  references: Reference[];       // Sources
}

PostSection {
  heading: string;               // Section title
  content: string;               // Main paragraph
  subsections?: SubSection[];    // Optional deeper content
}

SubSection {
  title: string;                 // Subsection title
  text: string;                  // Content
  examples?: string[];           // Optional examples list
}

Reference {
  title: string;                 // Source title
  url: string;                   // External link
}
```

---

## Service Architecture (BlogService)

```typescript
@Injectable({ providedIn: 'root' })
class BlogService {
  
  // Signal-based reactive state (Angular 21)
  blogPosts = signal<BlogPost[]>([]);
  
  constructor() {
    this.initializeBlogPosts();  // Load on init
  }
  
  // Data accessor methods
  getAllPosts(): BlogPost[]
    → Returns all posts from signal
    → Used by HomeComponent
  
  getPostBySlug(slug: string): BlogPost | undefined
    → Finds post matching slug
    → Used by BlogPostComponent with URL params
  
  getPostsByCategory(category: string): BlogPost[]
    → Filters posts by category
    → Used by future category filter features
  
  getCategories(): string[]
    → Extracts unique categories
    → Used by ReferencesComponent for grouping
  
  getRecentPosts(count: number = 3): BlogPost[]
    → Sorts by date descending
    → Returns top N posts
    → Used by HomeComponent for featured
  
  private initializeBlogPosts()
    → Creates 5 sample blog posts
    → Sets signal value
    → Called once on service init
}
```

---

## Component Communication

```
HomeComponent
    │
    ├──> inject(BlogService)
    │    └─ Returns: allPosts array (sync)
    │
    ├──> inject(BlogService)
    │    └─ Returns: recentPosts array (sync)
    │
    └──> *ngFor post of allPosts
         └─> BlogCardComponent
             @input post: BlogPost
             └─ Displays single card
             
BlogPostComponent
    │
    ├──> inject(ActivatedRoute)
    │    └─ paramMap.get('slug')
    │
    ├──> inject(BlogService)
    │    └─ getPostBySlug(slug)
    │
    └──> PostLayoutComponent
         @input post: BlogPost
         └─ Displays full content
         
ReferencesComponent
    │
    ├──> inject(BlogService)
    │    └─ getAllPosts() & getCategories()
    │
    └─ Computes references by category
       └─ *ngFor category in categories
          └─ *ngFor reference in post.references
             └─ Display references
```

---

## Signal-Based State Management

```
BlogService {
  
  // Reactive state using signals
  blogPosts = signal<BlogPost[]>([
    { id: '1', title: 'Post 1', ... },
    { id: '2', title: 'Post 2', ... },
    ...
  ]);
  
  // Components access via:
  
  HomeComponent {
    constructor(private service: BlogService) {}
    
    allPosts = this.service.getAllPosts();
    // Returns: BlogPost[] (reactive)
    // Updates: When signal changes
    
    // In template with @if / @for
    @for (post of allPosts; track post.id) {
      <app-blog-card [post]="post" />
    }
  }
}

// Benefits:
// - Reactive without RxJS
// - Automatic change detection
// - Type-safe
// - Performant with OnPush strategy
```

---

## Style Architecture (Tailwind CSS)

```
src/styles.css
    │
    └─ @import "tailwindcss";
            │
            ├─ Utility classes
            │  ├─ Spacing: p-6, m-4, gap-8
            │  ├─ Colors: green-600, blue-50, gray-900
            │  ├─ Sizing: w-full, h-32, max-w-4xl
            │  ├─ Display: flex, grid, block
            │  └─ Effects: shadow-lg, hover:shadow-xl
            │
            └─ Responsive prefixes
               ├─ sm: (640px) - tablets
               ├─ md: (768px) - small desktops
               ├─ lg: (1024px) - large screens
               └─ xl: (1280px) - extra large
               
tailwind.config.js
    │
    ├─ Content paths (scan for classes)
    │  └─ ./src/**/*.{html,ts}
    │
    ├─ Theme customization
    │  ├─ Green color palette
    │  ├─ Spacing scale
    │  └─ Typography settings
    │
    └─ Plugins (extensions)
```

---

## Performance Optimizations

```
Change Detection Strategy: OnPush
    │
    └─ Applied to all components
       └─ @Component decorator
          changeDetection: ChangeDetectionStrategy.OnPush
          
Benefits:
  - Only checks when @input changes
  - Skips unnecessary checks
  - Faster rendering

Lazy Loading Ready:
    │
    └─ Routes configured for lazy loading
       └─ Add: loadComponent: () => import(...)
       
Image Optimization:
    │
    └─ Uses NgOptimizedImage
       └─ Responsive image serving
       └─ Automatic sizing
       
Signal-Based State:
    │
    └─ No RxJS subscriptions needed
       └─ Memory efficient
       └─ No unsubscribe needed
```

---

## Styling Precedence

```
1. Inline styles (highest priority)
   <div style="...">
   
2. Component styles
   app.css, home.css, etc.
   
3. Global styles
   styles.css
   
4. Tailwind utilities (lowest priority)
   class="bg-green-600 p-4"
   
→ Tailwind handles most styling
→ Component CSS for specific styles
→ Inline for dynamic styles
```

---

## File Dependency Graph

```
index.html
    │
    └─> main.ts
        │
        └─> App (app.ts)
            ├─> NavbarComponent
            │   └─ navbar.html, navbar.ts
            │
            ├─> RouterOutlet + Routes
            │   ├─> HomeComponent
            │   │   ├─> home.html, home.ts
            │   │   └─> BlogCardComponent (multiple)
            │   │       └─ blog-card.html, blog-card.ts
            │   │
            │   ├─> BlogPostComponent
            │   │   ├─> blog-post.html, blog-post.ts
            │   │   ├─> ActivatedRoute for slug
            │   │   └─> PostLayoutComponent
            │   │       └─ post-layout.html, post-layout.ts
            │   │
            │   ├─> AboutComponent
            │   │   └─ about.html, about.ts
            │   │
            │   └─> ReferencesComponent
            │       └─ references.html, references.ts
            │
            ├─> FooterComponent
            │   └─ footer.html, footer.ts
            │
            └─> BlogService (injected everywhere)
                └─ blog.service.ts
                   └─ blog.model.ts
                   
styles.css (Global imports)
    └─> Tailwind CSS framework

tailwind.config.js (Build config)
    └─> Controls Tailwind compilation
```

---

## Build & Deployment Flow

```
npm start
    │
    └─> Angular Dev Server
        ├─> Compiles TypeScript
        ├─> Bundles modules
        ├─> Watches for changes
        ├─> Hot reload on save
        └─> Serves on http://localhost:4200

npm run build
    │
    └─> Production Build
        ├─> Minify code
        ├─> Tree shaking
        ├─> Ahead-of-Time (AOT) compilation
        ├─> Uglify CSS
        ├─> Split chunks
        └─> Output: dist/PEE_P3_Project/

Deploy to Vercel/Netlify/Firebase
    └─> Upload dist/ folder
        └─> Served to users globally
```

---

## Accessibility Features

```
Semantic HTML
    ├─> <header> for navbar
    ├─> <main> for content
    ├─> <footer> for footer
    ├─> <article> for posts
    ├─> <section> for grouped content
    └─> <nav> for navigation

Heading Hierarchy
    ├─> H1: Page title (one per page)
    ├─> H2: Section titles
    ├─> H3: Subsection titles
    └─> H4+: Deeper levels

ARIA Labels
    ├─> aria-label on buttons
    ├─> aria-expanded on menu toggles
    └─> role attributes where needed

Color Contrast
    ├─> Text: 4.5:1 minimum
    └─> UI: 3:1 minimum

Focus Management
    ├─> Keyboard navigation
    ├─> Focus visible states
    └─> Tab order preservation
```

---

## Testing Architecture (Ready to Implement)

```
Unit Tests (Vitest/Jasmine)
    │
    ├─> BlogService tests
    │   ├─ getPostBySlug()
    │   ├─ getAllPosts()
    │   └─ getCategories()
    │
    ├─> Component tests
    │   ├─ HomeComponent
    │   ├─ BlogPostComponent
    │   └─ NavbarComponent
    │
    └─ Mock BlogService
       └─ Test data fixtures

E2E Tests (Cypress/Playwright)
    │
    ├─ Navigation flow
    ├─ Post viewing
    ├─ Category filtering
    └─ Responsive design

Visual Regression Tests
    │
    └─ Compare screenshots
       based on viewport
```

---

## Security Considerations

```
XSS Protection
    └─> Angular sanitizes dynamic content
    └─> Use [innerHTML] carefully with sanitization

CSRF Protection
    └─> No direct backend calls (static data)
    └─> Add interceptors for future API calls

Content Validation
    └─> TypeScript interfaces enforce shape
    └─> Runtime type checking ready

Dependencies
    └─> Regular npm updates
    └─> Security audit: npm audit

API Security (Future)
    └─> HTTPS only
    └─> Environment variables for secrets
    └─> CORS headers
```

---

This architecture is scalable, maintainable, and follows Angular 21 best practices!
