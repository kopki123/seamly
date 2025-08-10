import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import products from './products.json' with { type: 'json' };

const prisma = new PrismaClient();

const categoryMap = {
  "f0a2c255-8963-4bf8-979a-57206fbc86b6": "上衣",
  "9a80cd28-803c-4018-917b-b95a50635e6c": "下著",
  "9aa6ee73-652f-4ec3-9f5e-2527df97eec2": "外套",
  "c798f630-4987-44e0-be97-5f57be13cdc2": "鞋類",
  "23c452fe-c335-47c2-b7e6-ec6370f9c84d": "配件",
};

async function main() {
  for (const [id, name] of Object.entries(categoryMap)) {
    await prisma.category.upsert({
      where: { id },
      update: {},
      create: { id, name }
    });
  }

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