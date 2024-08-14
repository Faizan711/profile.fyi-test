"use client";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store";
import toast, { Toaster } from "react-hot-toast";
import { applyDiscount } from "../../lib/slices/cartSlice";
import { useState } from "react";
import CartItem from "@/components/CartItem";
import Link from "next/link";

export default function Cart() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const subtotal = useSelector((state: RootState) => state.cart.subtotal);
  const discount = useSelector((state: RootState) => state.cart.discount);
  const [discountCode, setDiscountCode] = useState("");
  const dispatch = useDispatch();

  const handleApplyDiscount = () => {
    // Example discount application, validate discountCode here
    if (discountCode === "10OFF") {
      dispatch(applyDiscount(10)); // Apply 10% discount
      toast.success("10% Discount applied successfully");
    } else if (discountCode === "20OFF") {
      dispatch(applyDiscount(20)); // Apply 20% discount
      toast.success("20% Discount applied successfully");
    } else {
      dispatch(applyDiscount(0)); // No discount
      toast.error("Invalid discount code");
    }
  };

  const calculateTotal = () => {
    const total = subtotal - (subtotal * discount) / 100;
    return total.toFixed(2);
  };

  return (
    <div className="px-4 md:px-12 py-6 bg-gray-100 h-screen">
      <Link
        href={"/"}
        className="mb-6 py-2 px-4 bg-white rounded-xl border-2 border-yellow-500"
      >
        Back
      </Link>
      <h1 className="text-xl md:text-2xl font-bold mb-6 mt-6 text-yellow-500">
        Cart Page
      </h1>
      <div className="flex flex-col-reverse md:flex-row md:justify-around gap-y-8">
        <Toaster />
        <div>
          {cartItems.length === 0 ? (
            <div className="text-center">
              <p className="text-xl mb-4">Your cart is empty.</p>
              <Link href="/">
                <p className="text-blue-500 underline">Go back to shopping</p>
              </Link>
            </div>
          ) : (
            <>
              <h1 className="text-2xl border-b font-medium">CART ITEMS</h1>
              <div className="grid grid-cols-1 gap-6 mb-6 max-h-[400px] overflow-y-auto shadow-xl ">
                {cartItems.map((item) => (
                  <CartItem
                    key={item.product.id}
                    id={item.product.id}
                    title={item.product.title}
                    price={item.product.price}
                    image={item.product.image}
                    quantity={item.quantity}
                  />
                ))}
              </div>
            </>
          )}
        </div>
        <div>
          <div className="mb-6 p-4 bg-white rounded-xl shadow-xl">
            <h2 className="text-2xl border-b font-medium">Cart Summary</h2>
            <p className="text-md mt-5">Subtotal: ${subtotal.toFixed(2)}</p>
            <p className="text-md">Discount: {discount}%</p>
            <p className="text-xl font-bold mt-5">Total: ${calculateTotal()}</p>
            <h2 className="text-md font-medium mb-2 mt-5">
              Apply Discount Code
              <p className="text-sm font-light">
                (Try &quot;10OFF&quot; or &quot;20OFF&quot;)
              </p>
            </h2>
            <input
              type="text"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
              className="border rounded px-4 py-2 w-full mb-2"
            />
            <button
              className="bg-yellow-400 px-4 py-2 rounded w-full shadow-xl"
              onClick={handleApplyDiscount}
            >
              Apply Discount
            </button>
          </div>
          {/* <div className="mb-6 p-4 bg-white rounded-xl shadow-xl"></div> */}
          <button
            className="bg-yellow-400 w-full p-4 rounded mt-4 shadow-xl hover:scale-105"
            onClick={() =>
              toast("Checkout Successfull!", {
                icon: "👏",
              })
            }
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
