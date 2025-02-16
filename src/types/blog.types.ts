export interface BlogPost {
  id: string;
  title: string;
  description: string;
  category: string;
  author: {
    name: string;
    avatar: string;
  };
  date: string;
  image: string;
  content?: string;
  tags?: string[];
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
} 