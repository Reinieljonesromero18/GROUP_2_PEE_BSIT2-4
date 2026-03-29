import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'post/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      // Hardcode the slugs that exist in your blog
      return [
        { slug: 'causes-of-global-warming' },
        { slug: 'climate-change-impact' },
        { slug: 'biodiversity-loss' }
      ];
    }
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
