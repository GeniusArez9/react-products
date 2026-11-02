const API_URL = "https://dummyjson.com/products";

export async function getProducts(limit = 12, skip = 0) {
  const response = await fetch(`${API_URL}?limit=${limit}&skip=${skip}`);
  if (!response.ok) throw new Error("Error al obtener productos");
  return await response.json();
}

export async function getProductById(id) {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) throw new Error("Producto no encontrado");
  return await response.json();
}

export async function createProduct(product) {
  const response = await fetch(`${API_URL}/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  if (!response.ok) throw new Error("Error al crear producto");
  return await response.json();
}

export async function updateProduct(id, product) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  if (!response.ok) throw new Error("Error al actualizar producto");
  return await response.json();
}

export async function deleteProduct(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Error al eliminar producto");
  return await response.json();
} 