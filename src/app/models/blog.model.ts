export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: number;
  imageUrl: string;
  sections: PostSection[];
  references: Reference[];
}

export interface PostSection {
  heading: string;
  content: string;
  subsections?: SubSection[];
}

export interface SubSection {
  title: string;
  text: string;
  examples?: string[];
}

export interface Reference {
  title: string;
  url: string;
}
