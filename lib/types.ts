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

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  status: "pending" | "approved" | "rejected";
  featured: boolean;
  designId: string | null;
  createdAt: Date;
}

export interface CategoryCount {
  category: string;
  count: number;
  fill: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  description: string;
  createdAt: Date;
}

export interface BrandStory {
  id: string;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  downloadCount: number;
  uploadedAt: Date;
}
