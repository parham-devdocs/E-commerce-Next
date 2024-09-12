import { Button } from "@/components/ui/button";
import PageHeader from "../_components/PageHeader";
import Link from "next/link";
import { Table, TableHeader, TableRow, TableHead } from "@/components/ui/table";

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

function ProductsTable() {
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
    </Table>
  );
}
