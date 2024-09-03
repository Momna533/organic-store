const page = async () => {
  let products = [];
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const data = await res.json();
    products = data.products;
    console.log("products", products);
  } catch (error) {
    console.error("error", error);
  }
  return <h1>home page</h1>;
};

export default page;
