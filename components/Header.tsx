import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/organic-store-logo5.svg";
import LogoutButton from "@/components/LogoutButton";
import { FiShoppingCart } from "react-icons/fi";

const Header = () => {
  return (
    <div className="flex items-center justify-between p-4 open__sans">
      <div className="flex items-center">
        <Link href="/" className="flex items-center">
          <Image src={logo} alt="logo" className="w-36" priority />
        </Link>
        <div className="flex items-center ml-4">
          <Link
            className="p-4 text-[#333] hover:text-[#6a9739] transition-all"
            href="/shop"
          >
            Everything
          </Link>
          <Link
            className="p-4 text-[#333] hover:text-[#6a9739] transition-all"
            href="/product-category/groceries"
          >
            Groceries
          </Link>
          <Link
            className="p-4 text-[#333] hover:text-[#6a9739] transition-all"
            href="/product-category/juice"
          >
            Juice
          </Link>
        </div>
      </div>
      <div className="flex items-center">
        <div className="flex items-center">
          <Link
            className="p-4 text-[#333] hover:text-[#6a9739] transition-all"
            href="/about"
          >
            About
          </Link>
          <Link
            className="p-4 text-[#333] hover:text-[#6a9739] transition-all"
            href="/products"
          >
            Products
          </Link>
          <Link
            className="p-4 text-[#333] hover:text-[#6a9739] transition-all"
            href="/contact"
          >
            Contact
          </Link>
        </div>
        <Link
          href="/cart"
          className="flex items-center gap-2 text-[#8bc34a] font-semibold ml-4"
        >
          <div className="flex items-center">0.00</div>
          <div className="flex items-center">
            <FiShoppingCart />
          </div>
        </Link>
        <div className="ml-4 flex items-center gap-2">
          <Link
            href="/login"
            className="text-[#333] hover:text-[#6a9739] transition-all"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="text-[#333] hover:text-[#6a9739] transition-all"
          >
            Sign Up
          </Link>
          <LogoutButton />
        </div>
      </div>
    </div>
  );
};

export default Header;
