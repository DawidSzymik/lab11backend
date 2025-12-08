import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  console.log('Cleared existing data');

  // Create categories
  const categories = await Promise.all([
    prisma.category.create({ data: { name: 'Laptopy' } }),
    prisma.category.create({ data: { name: 'Komputery' } }),
    prisma.category.create({ data: { name: 'Monitory' } }),
    prisma.category.create({ data: { name: 'Peryferia' } }),
  ]);

  console.log('Created categories');

  // Create products
  const products = await Promise.all([
    prisma.product.create({
      data: {
        code: 'LAP-001',
        name: 'Laptop Dell XPS 13',
        description: 'Ultrabook z procesorem Intel i7',
        price: 4999.99,
        stock: 15,
        imageUrl: '/images/laptop1.jpg',
        categoryId: categories[0].id,
      },
    }),
    prisma.product.create({
      data: {
        code: 'LAP-002',
        name: 'Laptop HP Pavilion',
        description: 'Laptop do codziennego użytku',
        price: 2999.99,
        stock: 20,
        imageUrl: '/images/laptop2.jpg',
        categoryId: categories[0].id,
      },
    }),
    prisma.product.create({
      data: {
        code: 'PC-001',
        name: 'Komputer Gamingowy RTX',
        description: 'Wydajny komputer do gier',
        price: 7999.99,
        stock: 8,
        imageUrl: '/images/pc1.jpg',
        categoryId: categories[1].id,
      },
    }),
    prisma.product.create({
      data: {
        code: 'MON-001',
        name: 'Monitor LG 27"',
        description: 'Monitor 4K IPS',
        price: 1499.99,
        stock: 25,
        imageUrl: '/images/monitor1.jpg',
        categoryId: categories[2].id,
      },
    }),
    prisma.product.create({
      data: {
        code: 'PER-001',
        name: 'Klawiatura mechaniczna',
        description: 'RGB, przełączniki Cherry MX',
        price: 399.99,
        stock: 50,
        imageUrl: '/images/keyboard1.jpg',
        categoryId: categories[3].id,
      },
    }),
  ]);

  console.log('Created products');

  // Create a test user
  const user = await prisma.user.create({
    data: {
      email: 'test@example.com',
      name: 'Test User',
    },
  });

  console.log('Created test user');

  // Create cart for user
  const cart = await prisma.cart.create({
    data: {
      userId: user.id,
    },
  });

  console.log('Created cart');

  // Add items to cart
  await Promise.all([
    prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId: products[0].id,
        quantity: 1,
      },
    }),
    prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId: products[3].id,
        quantity: 2,
      },
    }),
  ]);

  console.log('Created cart items');

  // Create a test order
  const order = await prisma.order.create({
    data: {
      orderNumber: `ORD-${Date.now()}`,
      status: 'PENDING',
      totalAmount: 5999.97,
      userId: user.id,
      items: {
        create: [
          {
            productId: products[0].id,
            quantity: 1,
            priceAtPurchase: products[0].price,
            productName: products[0].name,
            productCode: products[0].code,
          },
        ],
      },
    },
  });

  console.log('Created test order');
  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });