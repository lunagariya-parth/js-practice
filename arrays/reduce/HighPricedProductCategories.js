const products = [
  { name: "Product 1", price: 20, category: "Electronics" },
  { name: "Product 2", price: 30, category: "Clothes" },
  { name: "Product 3", price: 40, category: "Electronics" },
  { name: "Product 4", price: 50, category: "Clothes" },
  { name: "Product 5", price: 60, category: "Clothes" },
  { name: "Product 6", price: 70, category: "Electronics" },
  { name: "Product 7", price: 80, category: "Clothes" },
  { name: "Product 8", price: 90, category: "Electronics" },
];

function HighPricedProductCategories(products) {
  const productsByCategory = products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {});

  const avgByCat = Object.keys(productsByCategory).map((cat) => {
    const sum = productsByCategory[cat].reduce((a, c) => (a += c.price), 0);
    return { category: cat, avg: (sum / productsByCategory[cat].length )};
  });

  return avgByCat.filter(category=>category.avg);
  //   return productsByCategory;
}

console.log(HighPricedProductCategories(products));
