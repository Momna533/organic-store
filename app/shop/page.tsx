import Image from "next/image";
import React from "react";

const page = async () => {
  let products = [];
  try {
    const res = await fetch("http://localhost:3000/api/products");
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const data = await res.json();
    products = data.products;
  } catch (error) {
    console.error(error);
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
              <Image src={image} alt={name} width={50} height={50} />
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

export default page;
