import productsData from '../data/products.json';

export interface Product {
  id: number;
  code: string;
  name: string;
  type: string;  
  price: number;
  amount: number;
  description: string;
  date: string;
  image: string;
}

const products: Product[] = productsData;

// Wszystkie produkty alfabetycznie
export function getAllProductsAlphabetically(): Product[] {
  return [...products].sort((a, b) => a.name.localeCompare(b.name));
}

// Wszystkie produkty od najnowszego
export function getAllProductsByNewest(): Product[] {
  return [...products].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// Produkty z przynajmniej jednym elementem na stanie
export function getProductsInStock(): Product[] {
  return products.filter(product => product.amount > 0);
}

// Produkty bez stanu (amount = 0)
export function getProductsOutOfStock(): Product[] {
  return products.filter(product => product.amount === 0);
}

// Wszystkie produkty danej kategorii
export function getProductsByCategory(category: Product['type']): Product[] {
  return products.filter(product => product.type === category);
}

// Wybrany produkt po id
export function getProductById(id: number): Product | undefined {
  return products.find(product => product.id === id);
}

// Zmiana ilości produktu o podanym id
export function updateProductAmount(id: number, newAmount: number): boolean {
  const product = products.find(p => p.id === id);
  if (product) {
    product.amount = newAmount;
    return true;
  }
  return false;
}