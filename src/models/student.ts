export interface Student {
  id?: string;
  name: string;
  age: number;
  mark: number;
  gender: 'male' | 'famale';
  city: string;

  createdAt?: number;
  updateAt?: number;
}
