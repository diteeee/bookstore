import React, { useState } from "react";
import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartBar from "@/components/shared/CartBar";

interface Props {
  children?: React.ReactNode;
  name?: string;
}

export function MainLayout(props: Props) {
  const [cartItemCount, setCartItemCount] = useState(0);

  const handleViewCart = () => {
    alert("View Cart clicked!");
    // Navigate to the cart page or display the cart modal
  };

  return (
    <div className="relative min-h-screen">
      <Head>
        <title>{props.name}</title>
      </Head>
      <Header />
      <main>{props.children}</main>
      <Footer />
      <CartBar itemCount={cartItemCount} onViewCart={handleViewCart} />
    </div>
  );
}

export default MainLayout;
