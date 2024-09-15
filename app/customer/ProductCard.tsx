"use client";
import { Button } from "@/components/ui/button"; 
import axios from "axios";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import prisma from "@/db/db";
import { formatCurrency } from "@/lib/formatters";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Item = {
  id: string;
  name: string;
  description: string;
  imagePath: string;
  priceInCents: number; // Change to number
};

export const ProductCard = ({
  id,
  name,
  description,
  imagePath,
  priceInCents,
}: Item) => {
  // Move AddToCart function outside of the component

  async function AddToCart(id) {
    const data = await axios.get("http://localhost:3000/customer/products/makeProduct")
    console.log(data.data)
  }

  return (
    <Card className="flex items-center flex-col border-primary">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Image
          src={imagePath}
          alt={name}
          width={300}
          height={300}
          className="rounded-md mx-auto"
        />
        <p>{formatCurrency(priceInCents / 100)}</p>
      </CardContent>
      <CardFooter>
        <Button
          variant="outline"
          className="bg-primary hover:bg-black hover:text-white transition-colors duration-300"
          onClick={()=>AddToCart(id)}
        >
          <Link href={`/customer/products/${id}/purchase`} passHref>
            <span className="flex items-center">
              Add to cart
              <ShoppingCart size={20} />
            </span>
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export const ProductCardSkeleton = () => {
  return (
    <Card className="flex items-center flex-col animate-pulse">
      <CardHeader>
        <CardTitle>
          <div className="bg-gray-200 w-10 h-6 rounded-md"></div>
        </CardTitle>
        <CardDescription>
          <div className="bg-gray-200 w-16 h-4 rounded-md"></div>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-gray-200 rounded-md mx-auto w-72 h-48" />
        <p className="bg-gray-200 w-16 h-4 rounded-md"></p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="bg-gray-700 text-white" disabled>
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};
