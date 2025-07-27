import { prisma } from "@/lib/prisma";

const fixImages = async () => {
  console.log('🔧 Starting image fix...')

  // Update all gifts to set image to null
  const updatedGifts = await prisma.gift.updateMany({
    where: {
      image: '/gifts/default.jpg'
    },
    data: {
      image: null
    }
  });

  console.log(`✅ Updated ${updatedGifts.count} gifts with null images`);
  console.log('🎉 Image fix completed successfully!');
};

fixImages(); 