import prisma from './prisma-client.js';
import products from './products.json';

async function main() {
  for (const product of products) {
    await prisma.product.create({
      data: product
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });