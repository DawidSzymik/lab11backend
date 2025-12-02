import { PrismaClient } from '@prisma/client';
import productsData from '../data/products.json';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // 1. Wyczyść istniejące dane
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  // 2. Utwórz kategorie
  const categories = ['procesor', 'karta graficzna', 'pamięć ram', 'dysk'];
  const categoryRecords = await Promise.all(
    categories.map((name) =>
      prisma.category.create({
        data: { name },
      })
    )
  );
  console.log(`✅ Utworzono ${categoryRecords.length} kategorii`);

  // 3. Mapowanie kategorii
  const categoryMap = Object.fromEntries(
    categoryRecords.map((cat) => [cat.name, cat.id])
  );

  // 4. Importuj produkty z data/products.json
  for (const product of productsData) {
    await prisma.product.create({
      data: {
        code: product.code,
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.amount,
        imageUrl: product.image,
        categoryId: categoryMap[product.type] || categoryMap['procesor'],
      },
    });
  }
  console.log(`✅ Zaimportowano ${productsData.length} produktów`);

  // 5. Utwórz użytkownika
  const user = await prisma.user.create({
    data: {
      email: 'dawid.szymik@example.com',
      name: 'Dawid Szymik',
      password: '$2a$10$abcdefghijklmnopqrstuv', // hash bcrypt (przykładowy)
    },
  });
  console.log(`✅ Utworzono użytkownika: ${user.email}`);

  // 6. Utwórz koszyk z 3 produktami
  const cart = await prisma.cart.create({
    data: {
      userId: user.id,
      items: {
        create: [
          { productId: 1, quantity: 1 }, // Intel Core i9-14900K
          { productId: 3, quantity: 1 }, // NVIDIA RTX 4090
          { productId: 5, quantity: 2 }, // Corsair Vengeance RGB 32GB
        ],
      },
    },
  });
  console.log(`✅ Utworzono koszyk z 3 produktami`);

  // 7. Utwórz 4 przeszłe zamówienia
  const orders = [
    {
      orderNumber: 'ORD-2024-001',
      status: 'DELIVERED',
      products: [
        { productId: 2, quantity: 1, price: 2699.99 }, // AMD Ryzen 9 7950X
        { productId: 7, quantity: 1, price: 999.99 },  // Samsung 990 PRO 2TB
      ],
    },
    {
      orderNumber: 'ORD-2024-002',
      status: 'DELIVERED',
      products: [
        { productId: 4, quantity: 1, price: 4999.99 }, // AMD Radeon RX 7900 XTX
        { productId: 6, quantity: 1, price: 1299.99 }, // G.Skill Trident Z5 64GB
      ],
    },
    {
      orderNumber: 'ORD-2024-003',
      status: 'SHIPPED',
      products: [
        { productId: 9, quantity: 1, price: 1899.99 },  // Intel Core i7-14700K
        { productId: 13, quantity: 2, price: 599.99 },  // Kingston Fury Beast 32GB
      ],
    },
    {
      orderNumber: 'ORD-2024-004',
      status: 'PROCESSING',
      products: [
        { productId: 11, quantity: 1, price: 5499.99 }, // NVIDIA RTX 4080
        { productId: 15, quantity: 1, price: 749.99 },  // Crucial P5 Plus 2TB
        { productId: 21, quantity: 1, price: 649.99 },  // TeamGroup T-Force Delta RGB
      ],
    },
  ];

  for (const orderData of orders) {
    const totalAmount = orderData.products.reduce(
      (sum, p) => sum + p.price * p.quantity,
      0
    );

    await prisma.order.create({
      data: {
        orderNumber: orderData.orderNumber,
        status: orderData.status as any,
        totalAmount,
        userId: user.id,
        items: {
          create: orderData.products.map((p) => ({
            productId: p.productId,
            quantity: p.quantity,
            priceAtPurchase: p.price,
            productName: productsData[p.productId - 1].name,
            productCode: productsData[p.productId - 1].code,
          })),
        },
      },
    });
  }
  console.log(`✅ Utworzono 4 zamówienia`);

  console.log('🎉 Seed zakończony pomyślnie!');
}

main()
  .catch((e) => {
    console.error('❌ Błąd seedingu:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });