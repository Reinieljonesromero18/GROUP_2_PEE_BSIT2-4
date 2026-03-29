import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BlogService } from '../../services/blog.service';
import { PostLayoutComponent } from '../../components/post-layout/post-layout';
import { signal } from '@angular/core';

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [CommonModule, RouterLink, PostLayoutComponent],
  templateUrl: './blog-post.html',
  styleUrl: './blog-post.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogPostComponent {
  private route = inject(ActivatedRoute);
  private blogService = inject(BlogService);

  post = signal(this.blogService.getPostBySlug(this.route.snapshot.paramMap.get('slug') || ''));
  allPosts = this.blogService.getAllPosts();

  getRelatedPosts() {
    const currentPost = this.post();
    if (!currentPost) return [];
    return this.allPosts
      .filter(
        (p) => p.category === currentPost.category && p.id !== currentPost.id
      )
      .slice(0, 3);
  }
}
