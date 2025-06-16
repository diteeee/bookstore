import React from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useRouter } from "next/router";

interface CartIconProps {
  itemCount: number;
}

const CartIcon: React.FC<CartIconProps> = ({ itemCount }) => {
  const router = useRouter();

  const handleCartClick = () => {
    router.push("/cart"); // Navigate to the cart page
  };

  return (
    <div
      onClick={handleCartClick}
      className="fixed bottom-10 right-6 bg-emerald-700 hover:bg-emerald-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center cursor-pointer z-50 transition duration-300"
    >
      <div className="relative">
        <ShoppingCartIcon style={{ fontSize: "32px" }} />
        {itemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-sm font-bold w-6 h-6 rounded-full flex items-center justify-center">
            {itemCount}
          </span>
        )}
      </div>
    </div>
  );
};

export default CartIcon;
