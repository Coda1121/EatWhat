export interface FoodItem {
  id: string;
  name: string;
  address?: string;
  googleMapUrl?: string;
}

export interface RouletteProps {
  items: FoodItem[];
  onSelectItem: (item: FoodItem | null) => void;
}

export interface ItemFormProps {
  items: FoodItem[];
  onAddItem: (item: FoodItem) => void;
  onEditItem: (index: number, item: FoodItem) => void;
  onDeleteItem: (index: number) => void;
  selectedItem: FoodItem | null;
} 