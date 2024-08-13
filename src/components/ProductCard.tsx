"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

interface ProductCardProps {
  imageLink: string;
  title: string;
  price: number;
  onClick: () => void;
}

function ProductCard({ imageLink, title, price, onClick }: ProductCardProps) {
  const [clicked, setClicked] = useState(false);

  const handleAddToCart = () => {
    setClicked(true);
    onClick();
    setTimeout(() => setClicked(false), 300); // Reset animation state after 300ms
  };

  return (
    <div className="shadow-xl">
      <Link
        href="#"
        className="group relative block overflow-hidden rounded-xl bg-transparent"
      >
        <img
          src={imageLink}
          alt=""
          className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
        />

        <div className="relative border  bg-white p-6">
          <span className="whitespace-nowrap bg-yellow-400 px-3 py-1.5 text-xs font-medium">
            {" "}
            New{" "}
          </span>

          <h3 className="mt-4 text-lg font-medium text-gray-900">{title}</h3>

          <p className="mt-1.5 text-sm text-gray-700">${price}</p>

          <form className="mt-4">
            <button
              type="button"
              className="block w-full rounded bg-yellow-400 p-4 text-sm font-medium transition hover:scale-105"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </form>
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;
