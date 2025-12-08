import prisma from '@/lib/prisma';

export async function getProductById(id: number) {
  return await prisma.product.findUnique({
    where: { id },
    include: { category: true },
  });
}

export async function getProductByCode(code: string) {
  return await prisma.product.findUnique({
    where: { code },
    include: { category: true },
  });
}

export async function getAllProducts() {
  return await prisma.product.findMany({
    include: { category: true },
    orderBy: { name: 'asc' },
  });
}

export async function getProductsByCategory(categoryName: string) {
  return await prisma.product.findMany({
    where: {
      category: {
        name: categoryName,
      },
    },
    include: { category: true },
  });
}