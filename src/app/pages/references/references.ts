import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-references',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './references.html',
  styleUrl: './references.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReferencesComponent {
  private blogService = inject(BlogService);
  allPosts = this.blogService.getAllPosts();

  // Get all unique references from all posts
  getAllReferences() {
    const referencesMap = new Map<string, string>();
    this.allPosts.forEach((post) => {
      post.references.forEach((ref) => {
        referencesMap.set(ref.url, ref.title);
      });
    });
    return Array.from(referencesMap.entries());
  }

  // Get references grouped by category
  getReferencesByCategory(category: string) {
    const post = this.allPosts.find((p) => p.category === category);
    return post ? post.references : [];
  }

  getCategories() {
    return this.blogService.getCategories();
  }
}
