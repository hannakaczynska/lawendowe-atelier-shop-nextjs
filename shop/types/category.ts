export type CategoryNode = {
  id: number;
  slug: string;
  name: string;
  children: CategoryNode[];
  parent: number;
};