// app/page.tsx
import Breadcrumb from "@/components/Breadcrumbs";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { FiChevronRight } from "react-icons/fi";

// app/fetchProducts.ts
export async function fetchProducts() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Network response was not ok");
    const data = await res.json();
    return data.products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

const SingleProduct = ({ product }) => {
  const { image, category, name, rating, price } = product;

  return (
    <div className="bg-white shadow-md rounded-lg p-4 relative">
      {image ? (
        <div className="relative w-full h-52">
          <Image
            src={image}
            alt={name || "Product Image"}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            fill
            className="rounded-lg object-cover"
            quality={75}
          />
        </div>
      ) : (
        <div className="w-full h-40 flex items-center justify-center bg-gray-200 rounded-lg">
          <span className="text-gray-500">No Image Available</span>
        </div>
      )}
      <h3 className="mt-2 text-lg font-semibold">{name}</h3>
      <p className="text-gray-600">{category}</p>
      <p className="font-bold">{price}</p>
    </div>
  );
};

export default async function Page() {
  const products = await fetchProducts();

  return (
    <div className="flex flex-col-reverse lg:flex-row max-w-[1300px] my-0 mx-auto px-4 lg:divide-x open__sans">
      <div className="w-[25%] mt-20 pr-14">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="search product..."
            className="p-2 placeholder:capitalize placeholder:text-md"
          />
          <button
            type="submit"
            className="bg-[#6a9739] hover:bg-[#8bc34a] text-white border-transparent rounded-sm p-2 text-xl transition-all"
          >
            <FiChevronRight />
          </button>
        </div>
        <h2>Filter by price</h2>
        <div>filter</div>
        <div>categories</div>
        <div>example products</div>
      </div>
      <div className="w-full lg:w-[75%] mt-6 lg:mt-20 lg:pl-14">
        <div className="open__sans text-sm text-[#777777]">
          <Breadcrumb />
          <Link href="/shopItems">shopItems</Link>
        </div>
        <h1 className="text-[#8bc34a] font-bold text-4xl lg:text-6xl ">Shop</h1>
        <div>search results</div>
        <Suspense fallback="loading">
          <div className="bg-red-950 grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
            {products.map((product) => (
              <SingleProduct key={product.id} product={product} />
            ))}
          </div>
        </Suspense>
        <div>pagination</div>
      </div>
    </div>
  );
}
