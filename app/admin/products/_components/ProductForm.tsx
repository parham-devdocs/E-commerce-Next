"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";
import { formatCurrency } from "@/lib/formatters";
import { AddProduct } from "../../_actions";
import { useFormStatus,useFormState } from "react-dom";
import {Product  } from "@prisma/client";
export default function ProductForm({ product }: { product?: Product | null }) {
  const [priceInCents, setPriceInCents] = useState<number | undefined>(Number(product?.priceInCents) || 0);
    const { pending } = useFormStatus()
  
    return (
      <div className=" flex  justify-between">
        <form className=" space-y-8 lg:w-[50%] w-full " action={AddProduct}>
          <div className=" space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              id="name"
              name="name"
              required
              defaultValue={product?.name}
              className=" focus:border-2 focus:border-primary transition-colors duration-300"
            ></Input>
          </div>
          <div className=" space-y-2">
            <Label htmlFor="price">Price in cents</Label>
            <Input
              type="number"
              id="priceInCents"
              name="priceInCents"
              required
              className=" focus:border-2 focus:border-primary transition-colors duration-300"
              value={priceInCents}
              onChange={(e) =>
                setPriceInCents(Number(e.target.value) || undefined)
              }
            ></Input>
            <div>{formatCurrency(priceInCents || 0 / 100)}</div>
          </div>
          <div className=" space-y-2">
            <Label htmlFor="name">Description</Label>
            <Textarea
              id="description"
              name="description"
              className=" focus:border-2 focus:border-primary transition-colors duration-300"
              defaultValue={product?.description}
            ></Textarea>
          </div>
          <div className=" space-y-2">
            <Label htmlFor="name">File</Label>
            <Input
              type="file"
              id="file"
              name="file"
              className=" focus:border-2 focus:border-primary transition-colors duration-300"
              value={product?.filePath}
            />
            {product?.filePath && (
              <p className=" text-secondary-foreground"> {product?.filePath}</p>
            )}
          </div>
          <div className=" space-y-2">
            <Label htmlFor="name">Image</Label>
            <Input
              type="file"
              id="image"
              name="image"
              className=" focus:border-2 focus:border-primary transition-colors duration-300"
              value={product?.imagePath}
            />
            {product?.imagePath && (
              <Image src={product?.imagePath} alt="product image" height="200" width="200"/>
            )}
          </div>
          <Button
            type="submit"
            disabled={pending}
            className=" hover:bg-black hover:text-white transition-colors duration-300"
          >
            {pending ? "saving..." : "save"}
          </Button>
        </form>
        <div className=" hidden lg:flex  w-[50%] justify-center  ">
          <Image
            className=" animate-fade-in"
            src={"/2.svg"}
            alt="image"
            width={500}
            height={500}
          />
        </div>
      </div>
    );
}
