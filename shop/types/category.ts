export type CategoryStore = {
  selectedCategories: string[];
  setSelectedCategories: (cats: string[]) => void;
};

export type CategoryNode = {
  id: number;
  slug: string;
  name: string;
  children: CategoryNode[];
  parent: number;
};