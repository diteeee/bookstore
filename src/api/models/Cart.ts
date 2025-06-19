export interface CartItem {
  _id?: string;
  userId: string;
  bookKey: string;
  title: string;
  body: string;
  cover: string,
  authorName?: string[];
  createdAt?: Date;
}