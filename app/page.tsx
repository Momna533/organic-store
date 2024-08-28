import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "@/assets/organic-store-logo5.svg";
const page = () => {
  return (
    <div>
      <div className="flex">
        <div>
          <div>
            <Link href="/">
              <Image src={logo} alt="logo" />
            </Link>
          </div>
          <div className="">
            <Link href="/shop">Everything</Link>
            <Link href="/product-category/groceries">Groceries</Link>
            <Link href="/product-category/juice">Juice</Link>
          </div>
        </div>
        <div>
          <div className="">
            <Link href="/about">About</Link>
            <Link href="/products">Products</Link>
            <Link href="/contact">Contact</Link>
          </div>
          <div>
            <Link href="/cart">
              <div>0.00</div>
              <div>Cart</div>
            </Link>
          </div>
          <div>
            <Link href="/login">Login</Link>
            <Link href="/signup">Sign Up</Link>
            <Link href="/login">Logout</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
