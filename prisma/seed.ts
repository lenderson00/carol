import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

const main = async () => {
  const hashedPassword = await hash("Cury@2025", 10);

  const user = await prisma.user.create({
    data: {
      email: "flenilson00@gmail.com",
      name: "Lenilson Ferreira",
      password: hashedPassword,
    },
  });

  console.log(user);
};

main();