import { useEffect, useState } from "react";
import { getProducts, createProduct, updateProduct, deleteProduct } from "../services/productService";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ title: "", price: "", description: "" });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(data.products);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  }

  async function handleCreate(event) {
    event.preventDefault();
    try {
      const newProduct = await createProduct({
        ...form,
        price: Number(form.price),
      });
      setProducts([newProduct, ...products]);
      setForm({ title: "", price: "", description: "" });
    } catch (error) {
      setError(error.message);
    }
  }

  function handleEdit(product) {
    setEditingId(product.id);
    setForm({
      title: product.title,
      price: product.price,
      description: product.description,
    });
  }

  async function handleUpdate(event) {
    event.preventDefault();
    try {
      const updated = await updateProduct(editingId, {
        ...form,
        price: Number(form.price),
      });
      setProducts(
        products.map((product) =>
          product.id === editingId ? { ...product, ...updated } : product
        )
      );
      setEditingId(null);
      setForm({ title: "", price: "", description: "" });
    } catch (error) {
      setError(error.message);
    }
  }

  async function handleDelete(id) {
    try {
      await deleteProduct(id);
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      setError(error.message);
    }
  }

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section>
      <h1>Productos</h1>
     
      <form onSubmit={editingId ? handleUpdate : handleCreate} className="product-form">
        <input
          type="text"
          name="title"
          placeholder="Nombre"
          value={form.title}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Precio"
          value={form.price}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Descripción"
          value={form.description}
          onChange={handleChange}
        />
        <button type="submit">
          {editingId ? "Actualizar" : "Guardar"}
        </button>
      </form>

      <div>
        {products.map((product) => (
          <div key={product.id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
            <h3>{product.title}</h3>
            <p>Precio: ${product.price}</p>
            <button onClick={() => handleEdit(product)}>Editar</button>
            <button onClick={() => handleDelete(product.id)}>Eliminar</button>
          </div>
        ))}
      </div>
    </section>
  );
}
export default Products;