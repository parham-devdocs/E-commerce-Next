import prisma from "@/db/db";
import { notFound } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import fs from 'fs/promises';

export async function GET(req: NextRequest, { params: { id } }: { params: { id: string } }) {
    
    const data = await prisma.product.findUnique({
        where: { id },
        select:{filePath:true,name:true}
    })
    if (data == null) return notFound()
    const { size } = await fs.stat(data.filePath)
    const file = await fs.readFile(data.filePath)
    const extention = data.filePath.split('.').pop()
    return new NextResponse(file, {
        headers: {
            "Content-Disposition": `attachment ; filename="${data.name}.${extention}"`,
            "Content-Length": size.toString(),
            
    }})
}