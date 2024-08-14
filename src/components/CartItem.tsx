// components/CartItem.tsx

import Image from "next/image";
import { useDispatch } from "react-redux";
import { updateQuantity, removeFromCart } from "../lib/slices/cartSlice";
import { Trash2Icon } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

interface CartItemProps {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

const CartItem: React.FC<CartItemProps> = ({
  id,
  title,
  price,
  image,
  quantity,
}) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    toast.success("Product Removed from cart!");
    dispatch(removeFromCart(id));
  };

  const handleQuantityChange = (quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  return (
    <>
      <Toaster />
      <div className="p-4 bg-white rounded-2xl flex flex-col gap-y-5 md:flex-row gap-x-5 items-center justify-between ">
        <Image src={image} alt={title} width={100} height={100} />
        <div className="flex-1 ml-4">
          <h2 className="text-lg font-medium">{title}</h2>
          <p>${price}</p>
          <div className="flex items-center mt-2">
            <button
              className="bg-gray-200 px-2 py-1 rounded"
              onClick={() => handleQuantityChange(quantity - 1)}
              disabled={quantity <= 1}
            >
              -
            </button>
            <input
              type="number"
              value={quantity}
              min="1"
              className="w-16 mx-2 text-center border rounded"
              onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
            />
            <button
              className="bg-gray-200 px-2 py-1 rounded"
              onClick={() => handleQuantityChange(quantity + 1)}
            >
              +
            </button>
          </div>
        </div>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={handleRemove}
        >
          <Trash2Icon />
        </button>
      </div>
    </>
  );
};

export default CartItem;
