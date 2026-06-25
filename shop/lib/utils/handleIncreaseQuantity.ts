  import { toast } from "sonner";

  export const handleIncreaseQuantity = (productId: number, maxQuantity: number, quantity: number, increaseQuantity: (productId: number, maxQuantity: number) => void) => {
    increaseQuantity(productId, maxQuantity);
    if (quantity + 1 >= maxQuantity) {
    toast.error("Brakuje więcej sztuk na stanie :(");
    }
  }