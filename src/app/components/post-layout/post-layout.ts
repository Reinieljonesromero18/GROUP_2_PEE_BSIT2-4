import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogPost } from '../../models/blog.model';

@Component({
  selector: 'app-post-layout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-layout.html',
  styleUrl: './post-layout.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostLayoutComponent {
  post = input.required<BlogPost>();
}
