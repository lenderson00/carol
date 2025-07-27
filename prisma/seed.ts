import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

const main = async () => {
  console.log('🌱 Starting seed...')

  // Create user
  const hashedPassword = await hash(process.env.SUPER_ADMIN_PASSWORD!, 10);
  const user = await prisma.user.create({
    data: {
      username: process.env.SUPER_ADMIN!,
      name: "Carol",
      password: hashedPassword,
    },
  });
  console.log('✅ User created:', user.name);

  // Create gift categories
  const categories = await Promise.all([
    prisma.giftCategory.create({
      data: {
        name: 'Perfumes',
        color: 'bg-purple-500',
      },
    }),
    prisma.giftCategory.create({
      data: {
        name: 'Sapatos',
        color: 'bg-blue-500',
      },
    }),
    prisma.giftCategory.create({
      data: {
        name: 'Roupas',
        color: 'bg-pink-500',
      },
    }),
    prisma.giftCategory.create({
      data: {
        name: 'Acessórios',
        color: 'bg-yellow-500',
      },
    }),
  ]);

  console.log('✅ Categories created:', categories.length);

  // Create perfumes
  const perfumes = await Promise.all([
    prisma.gift.create({
      data: {
        name: 'Rosa e Algodão',
        image: '/gifts/default.jpg',
        description: 'Perfume O Boticário',
        categoryId: categories[0].id,
      },
    }),
    prisma.gift.create({
      data: {
        name: 'Pessegura',
        image: '/gifts/default.jpg',
        description: 'Perfume O Boticário',
        categoryId: categories[0].id,
      },
    }),
    prisma.gift.create({
      data: {
        name: 'Coffee Women Seduction',
        image: '/gifts/default.jpg',
        description: 'Perfume O Boticário',
        categoryId: categories[0].id,
      },
    }),
    prisma.gift.create({
      data: {
        name: 'Bendito Cacto',
        image: '/gifts/default.jpg',
        description: 'Perfume O Boticário',
        categoryId: categories[0].id,
      },
    }),
    prisma.gift.create({
      data: {
        name: 'Liz',
        image: '/gifts/default.jpg',
        description: 'Perfume O Boticário',
        categoryId: categories[0].id,
      },
    }),
    prisma.gift.create({
      data: {
        name: 'Glamour',
        image: '/gifts/default.jpg',
        description: 'Perfume O Boticário',
        categoryId: categories[0].id,
      },
    }),
    prisma.gift.create({
      data: {
        name: 'Glamour Gold Glam',
        image: '/gifts/default.jpg',
        description: 'Perfume O Boticário',
        categoryId: categories[0].id,
      },
    }),
    prisma.gift.create({
      data: {
        name: 'Creme Esfoliante de Coco',
        image: '/gifts/default.jpg',
        description: 'O Boticário',
        categoryId: categories[0].id,
      },
    }),
    prisma.gift.create({
      data: {
        name: 'Nuvem de Alegria - Loção Desodorante',
        image: '/gifts/default.jpg',
        description: 'O Boticário',
        categoryId: categories[0].id,
      },
    }),
    prisma.gift.create({
      data: {
        name: 'Nuvem de Alegria - Body Splash',
        image: '/gifts/default.jpg',
        description: 'O Boticário',
        categoryId: categories[0].id,
      },
    }),
    prisma.gift.create({
      data: {
        name: 'Blue',
        image: '/gifts/default.jpg',
        description: 'Perfume FLORATTA',
        categoryId: categories[0].id,
      },
    }),
    prisma.gift.create({
      data: {
        name: 'E.joy',
        image: '/gifts/default.jpg',
        description: 'Perfume EGEO',
        categoryId: categories[0].id,
      },
    }),
    prisma.gift.create({
      data: {
        name: 'Vanilla Vibe',
        image: '/gifts/default.jpg',
        description: 'Perfume EGEO',
        categoryId: categories[0].id,
      },
    }),
  ]);

  // Create shoes
  const shoes = await Promise.all([
    prisma.gift.create({
      data: {
        name: 'CROCS',
        image: '/gifts/default.jpg',
        description: 'Sugestões: Crocs, Constance, Melissa, Nike, Adidas, Puma, Fila',
        categoryId: categories[1].id,
      },
    }),
    prisma.gift.create({
      data: {
        name: 'Tênis',
        image: '/gifts/default.jpg',
        description: 'Sugestões: Crocs, Constance, Melissa, Nike, Adidas, Puma, Fila',
        categoryId: categories[1].id,
      },
    }),
    prisma.gift.create({
      data: {
        name: 'Papete',
        image: '/gifts/default.jpg',
        description: 'Número 37 - Sugestões: Crocs, Constance, Melissa, Nike, Adidas, Puma, Fila',
        categoryId: categories[1].id,
      },
    }),
  ]);

  // Create clothes
  const clothes = await Promise.all([
    prisma.gift.create({
      data: {
        name: 'Blusas P',
        image: '/gifts/default.jpg',
        description: 'Sugestões: Aquamar, C&A, Riachuelo, Zara, Constance',
        categoryId: categories[2].id,
      },
    }),
    prisma.gift.create({
      data: {
        name: 'Short',
        image: '/gifts/default.jpg',
        description: 'Número 40 - Sugestões: Aquamar, C&A, Riachuelo, Zara, Constance',
        categoryId: categories[2].id,
      },
    }),
    prisma.gift.create({
      data: {
        name: 'Calça Wide Leg',
        image: '/gifts/default.jpg',
        description: 'Número 40 - Sugestões: Aquamar, C&A, Riachuelo, Zara, Constance',
        categoryId: categories[2].id,
      },
    }),
  ]);

  // Create accessories
  const accessories = await Promise.all([
    prisma.gift.create({
      data: {
        name: 'Anel',
        image: '/gifts/default.jpg',
        description: 'Número 16 ou 17 - Sugestões: Prata e Cor, Complemento',
        categoryId: categories[3].id,
      },
    }),
    prisma.gift.create({
      data: {
        name: 'Brincos',
        image: '/gifts/default.jpg',
        description: 'Sugestões: Prata e Cor, Complemento',
        categoryId: categories[3].id,
      },
    }),
    prisma.gift.create({
      data: {
        name: 'Pulseiras',
        image: '/gifts/default.jpg',
        description: 'Sugestões: Prata e Cor, Complemento',
        categoryId: categories[3].id,
      },
    }),
    prisma.gift.create({
      data: {
        name: 'Bolsas',
        image: '/gifts/default.jpg',
        description: 'Sugestões: Prata e Cor, Complemento',
        categoryId: categories[3].id,
      },
    }),
    prisma.gift.create({
      data: {
        name: 'Óculos de Sol',
        image: '/gifts/default.jpg',
        description: 'Sugestões: Prata e Cor, Complemento',
        categoryId: categories[3].id,
      },
    }),
    prisma.gift.create({
      data: {
        name: 'Berloques',
        image: '/gifts/default.jpg',
        description: 'Sugestões: Prata e Cor, Complemento',
        categoryId: categories[3].id,
      },
    }),
  ]);

  console.log('✅ Perfumes created:', perfumes.length);
  console.log('✅ Shoes created:', shoes.length);
  console.log('✅ Clothes created:', clothes.length);
  console.log('✅ Accessories created:', accessories.length);
  console.log('🎉 Seed completed successfully!');
};

main();