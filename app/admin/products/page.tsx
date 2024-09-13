import { Button } from "@/components/ui/button";
import PageHeader from "../_components/PageHeader";
import Link from "next/link";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import prisma from "@/db/db";
import { CheckCircle2, MoreVertical, XCircle } from "lucide-react";
import { formatCurrency, formatNumber } from "./../../../lib/formatters";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import { DeleteDropDownItem,ActiveToggleDropDownItem } from "./_components/ProductsAction";

export default function AdminProductsPage() {
  return (
    <>
      <div className=" flex justify-between items-center gap-4">
        <PageHeader>Products page</PageHeader>
        <Button
          asChild
          className=" hover:bg-black hover:text-white transition-colors duration-500"
        >
          <Link href="/admin/products/new">Add Products</Link>
        </Button>
      </div>
      <ProductsTable />
    </>
  );
}

async function ProductsTable() {
  const products = await prisma.product.findMany({
    select: {
      id: true,
      name: true,
      priceInCents: true,
      isAvailableForPurchase: true,
      _count: { select: { orders: true } },
    },
    orderBy: { name: "asc" },
  });

  if (products.length === 0) {
    return <div>No products yet</div>;
  }

  return (
    <Table className=" border-b-2 border-b-primary">
      <TableHeader>
        <TableRow>
          <TableHead className=" w-0 ">
            <span className=" sr-only">Available For Purchase</span>
          </TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Orders</TableHead>
          <TableHead className=" w-0">
            <span className=" sr-only">Actions </span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((item) => {
          return (
            <TableRow key={item.id}>
              <TableCell>
                {item.isAvailableForPurchase ? <CheckCircle2 /> : <XCircle />}
              </TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>
                {formatCurrency(Number(item.priceInCents) / 100)}
              </TableCell>
              <TableCell>{formatNumber(item._count.orders)}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <MoreVertical />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-primary rounded-lg shadow-lg w-24 ">
                    <DropdownMenuItem className="hover:bg-white outline-none  transition-colors duration-300 border-none my-2 rounded-md">
                      <a
                        download
                        href={`/admin/products/${item.id}/download`}
                        className="block py-2 px-2"
                      >
                        Download
                      </a>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-white outline-none  transition-colors duration-300 border-none my-2 rounded-md">
                      <Link
                        href={`/admin/products/${item.id}/edit`}
                        className="block py-2 px-2"
                      >
                        Edit
                      </Link>
                    </DropdownMenuItem>
                    <ActiveToggleDropDownItem
                      id={item.id}
                      isAvailableForPurchase={item.isAvailableForPurchase}
                    />
                    <DeleteDropDownItem id={ item.id } />
                  </DropdownMenuContent>
                </DropdownMenu>
                <span className=" sr-only">Actions</span>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
