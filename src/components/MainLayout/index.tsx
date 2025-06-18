import React, { useState } from "react";
import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartIcon from "@/components/shared/CartIcon";

interface Props {
  children?: React.ReactNode;
  name?: string;
}

export function MainLayout(props: Props) {
  const [cartItemCount, setCartItemCount] = useState(0);

  return (
    <div className="relative min-h-screen">
      <Head>
        <title>{props.name}</title>
      </Head>
      <Header />
      <main>{props.children}</main>
      <Footer />
      <CartIcon itemCount={cartItemCount} />
    </div>
  );
}

export default MainLayout;
