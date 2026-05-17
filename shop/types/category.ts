export type CategoryStore = {
  selectedTreeCategories: string[];
  setSelectedTreeCategories: (cats: string[]) => void;
};

export type CategoryNode = {
  id: number;
  slug: string;
  name: string;
  children: CategoryNode[];
  parent: number;
};