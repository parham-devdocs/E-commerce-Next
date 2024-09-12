import { Button } from "@/components/ui/button";
import PageHeader from "../_components/PageHeader";
import Link from "next/link";

export default function AdminProductsPage() {
    return <>
        <div className=" flex justify-between items-center gap-4">
            <PageHeader>Products page</PageHeader>
            <Button asChild className=" hover:bg-black hover:text-white transition-colors duration-500"><Link href="/admin/products/new">Add Products</Link></Button>

        </div>
        <h1>hi</h1>
    </>
}