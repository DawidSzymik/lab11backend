'use server';

import prisma from '@/lib/prisma';

export async function getCartWithItems(userId: string) {
  const cart = await prisma.cart.findUnique({
    where: {
      userId: parseInt(userId),
    },
    include: {
      items: {
        include: {
          product: {
            include: {
              category: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  });

  return cart;
}

export async function getCartTotal(userId: string) {
  const cart = await getCartWithItems(userId);

  if (!cart) {
    return 0;
  }

  const total = cart.items.reduce((sum, item) => {
    return sum + Number(item.product.price) * item.quantity;
  }, 0);

  return total;
}