import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BlogPost } from '../../models/blog.model';

@Component({
  selector: 'app-blog-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './blog-card.html',
  styleUrl: './blog-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogCardComponent {
  post = input.required<BlogPost>();
}
