export interface Case {
  id: string;
  title: string;
  description: string;
  location: string;
  category: string;
  image?: string;
  status: 'pending' | 'in-progress' | 'resolved';
  createdAt: Date;
}
