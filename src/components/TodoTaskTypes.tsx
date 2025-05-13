export type Task = {
  id: number;
  title: string;
  isCompleted: boolean;
  priority?: 'p1' | 'p2' | 'p3';
};
