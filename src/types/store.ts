
export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  type: "PDF" | "MP3" | "Software";
  imageUrl: string;
  mediaUrl: string;
  rating: number;
  downloads: number;
  reviews: Review[];
  authorId: string;
  authorName: string;
  createdAt: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface CartItem extends Product {
  quantity: number;
}
