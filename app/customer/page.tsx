import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import prisma from "@/db/db";
import { formatCurrency } from "@/lib/formatters";
import { Product } from "@prisma/client";
import { ArrowRight, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ProductCard ,ProductCardSkeleton } from "./ProductCard";
import { Suspense } from "react";
import {  cache} from "@/lib/cache";
const getPopularProducts = cache(() => {
  return prisma.product.findMany({
    where: { isAvailableForPurchase: true },
    orderBy: { orders: { _count: "desc" } },
    take: 6,
  });
}, ["/", "getPopularProducts"],{revalidate:24*60*60});

const getNewstProducts = cache(() => {
  return prisma.product.findMany({
    where: { isAvailableForPurchase: true },
    orderBy: { createdAt: "desc" },
    take: 6,
  });
}, ["/", " getNewstProducts"],{revalidate:24*60*60});
export default function HomePage() {
  return (
    <main className=" space-y-12">
      <ProductGridSection
        productFetcher={getNewstProducts}
        title="Most Popular"
      />
      <Separator className=" h-[1px] bg-primary" />
      <ProductGridSection productFetcher={getPopularProducts} title="Newest" />
    </main>
  );
}

type ProductSectionProps = {
  productFetcher: () => Promise<Product[]>;
  title: string;
};
async function ProductGridSection({
  productFetcher,
  title,
}: ProductSectionProps) {
  return (
    <div className=" space-y-4">
      <div className="flex gap-4 my-16">
        <h2 className=" text-3xl font-bold"> {title}</h2>
        <Button
          variant="outline"
          className=" bg-primary hover:bg-black hover:text-white transition-colors duration-300"
        >
          <Link href="/products" className=" gap-2 flex">
            View All
            <ArrowRight size={20} className=" animate-pulse" />
          </Link>
        </Button>
      </div>
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-32 gap-y-16">
        <Suspense fallback={<ProductCardSkeleton/>}>
        
          <ProductSuspense productFetcher={productFetcher} />
        </Suspense>
      </div>
    </div>
  );
}



async function ProductSuspense({
  productFetcher,
}: {
  productFetcher: () => Promise<Product[]>;
}) {
  const items = await productFetcher(); // Await the promise here
  return items.map((item) => {
    return (
      <ProductCard
        id={item.id}
        name={item.name}
        description={item.description}
        imagePath={item.imagePath}
        priceInCents={Number(item.priceInCents)}
        key={item.id}
      />
    );
  });
}
