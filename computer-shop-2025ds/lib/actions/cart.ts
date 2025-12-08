'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function getCartWithItems(userId: string) {
  const cart = await prisma.cart.findUnique({
    where: {
      userId: userId,
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

export async function getAllUsersWithCarts() {
  const users = await prisma.user.findMany({
    include: {
      cart: {
        include: {
          items: true,
        },
      },
    },
  });

  return users;
}

export async function transferCart(fromUserId: string, toUserId: string) {
  if (fromUserId === toUserId) {
    throw new Error('Nie można przenieść koszyka do tego samego użytkownika');
  }

  const fromCart = await prisma.cart.findUnique({
    where: { userId: fromUserId },
    include: { items: true },
  });

  if (!fromCart || fromCart.items.length === 0) {
    throw new Error('Źródłowy koszyk jest pusty');
  }

  let toCart = await prisma.cart.findUnique({
    where: { userId: toUserId },
  });

  if (!toCart) {
    toCart = await prisma.cart.create({
      data: { userId: toUserId },
    });
  }

  await prisma.$transaction(async (tx) => {
    for (const item of fromCart.items) {
      const existingItem = await tx.cartItem.findUnique({
        where: {
          cartId_productId: {
            cartId: toCart!.id,
            productId: item.productId,
          },
        },
      });

      if (existingItem) {
        await tx.cartItem.update({
          where: { id: existingItem.id },
          data: { quantity: existingItem.quantity + item.quantity },
        });
      } else {
        await tx.cartItem.create({
          data: {
            cartId: toCart!.id,
            productId: item.productId,
            quantity: item.quantity,
          },
        });
      }
    }

    await tx.cartItem.deleteMany({
      where: { cartId: fromCart.id },
    });
  });

  revalidatePath('/basket');
}
export async function addToCart(userId: string, productCode: string, quantity: number = 1) {
  // Znajdź produkt po kodzie
  const product = await prisma.product.findUnique({
    where: { code: productCode },
  });

  if (!product) {
    throw new Error('Produkt nie istnieje');
  }

  if (product.stock < quantity) {
    throw new Error('Niewystarczająca ilość produktu na magazynie');
  }

  // Znajdź lub utwórz koszyk
  let cart = await prisma.cart.findUnique({
    where: { userId },
  });

  if (!cart) {
    cart = await prisma.cart.create({
      data: { userId },
    });
  }

  // Sprawdź czy produkt już jest w koszyku
  const existingItem = await prisma.cartItem.findUnique({
    where: {
      cartId_productId: {
        cartId: cart.id,
        productId: product.id,
      },
    },
  });

  if (existingItem) {
    // Zwiększ ilość
    await prisma.cartItem.update({
      where: { id: existingItem.id },
      data: { quantity: existingItem.quantity + quantity },
    });
  } else {
    // Dodaj nowy produkt
    await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId: product.id,
        quantity,
      },
    });
  }

  revalidatePath('/basket');
  return { success: true, message: 'Produkt dodany do koszyka' };
}