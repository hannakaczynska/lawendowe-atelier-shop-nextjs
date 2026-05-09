export type CategoryStore = {
  selectedTreeCategories: string[];
  selectedCategories: string[];

  setSelectedCategories: (cats: string[]) => void;
  setSelectedTreeCategories: (cats: string[]) => void;
};

export type CategoryNode = {
  id: number;
  slug: string;
  name: string;
  children: CategoryNode[];
  parent: number;
};