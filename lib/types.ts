export interface Design {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  imageAlt: string;
  caption: string | null;
  clientName: string | null;
  behanceUrl: string | null;
  featured: boolean;
  displayOrder: number;
  createdAt: Date;
}
