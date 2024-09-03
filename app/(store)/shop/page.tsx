import Image from "next/image";
import React from "react";

const Page = async () => {
  let products = [];
  try {
    const res = await fetch("/api/products", { cache: "no-store" });
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const data = await res.json();
    products = data.products;
  } catch (error) {
    console.error("error", error);
  }

  return (
    <div>
      <div>
        <div>search</div>
        <h2>Filter by price</h2>
        <div>filter</div>
        <div>categories</div>
        <div>example products</div>
      </div>
      <div>
        <div>breadcrumbs</div>
        <h1>Shop</h1>
        <div>search results</div>
        {products.map((product) => {
          const { image, category, name, rating, price } = product;
          return (
            <div key={product._id}>
              <Image
                src={image}
                alt={name}
                width={50}
                height={50}
                loading="lazy"
              />
              <div>{category}</div>
              <div>{name}</div>
              <div>{rating}</div>
              <div>{price}</div>
            </div>
          );
        })}

        <div>pagiantion</div>
      </div>
    </div>
  );
};

export default Page;
