const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

let products = require("./products.json");

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.post("/api/products", (req, res) => {
  const product = {
    id: Date.now(),
    name: req.body.name,
    price: req.body.price
  };

  products.push(product);

  fs.writeFileSync(
    "products.json",
    JSON.stringify(products, null, 2)
  );

  res.json(product);
});

app.delete("/api/products/:id", (req, res) => {
  products = products.filter(
    p => p.id != req.params.id
  );

  fs.writeFileSync(
    "products.json",
    JSON.stringify(products, null, 2)
  );

  res.json({ message: "Deleted" });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
