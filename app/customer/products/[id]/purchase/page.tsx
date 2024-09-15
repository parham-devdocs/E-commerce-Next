
import { ProductCard } from "@/app/customer/ProductCard"
import prisma from "@/db/db"
import { notFound } from "next/navigation"


export default async function Purchase({params:{id}}:{params:{id:string}}) {

    const data = await prisma.product.findUnique({ where: { id } })
    console.log(id)
    console.log(data)
if (data == null) return notFound()
    return <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <ProductCard id={data.id} priceInCents={Number(data.priceInCents)} name={data.name} imagePath={data.imagePath} description={ data.description } />
    </div>
}