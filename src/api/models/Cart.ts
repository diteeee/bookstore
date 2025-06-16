export interface CartItem {
  _id?: string;
  userId: string; // Assuming user authentication, each cart is tied to a user
  bookKey: string; // Unique key of the book
  title: string;
  authorName?: string[];
  createdAt?: Date;
}