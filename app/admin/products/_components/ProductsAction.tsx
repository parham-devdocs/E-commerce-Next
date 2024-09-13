"use client"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useTransition } from "react";
import { deleteProduct, toggleProductAvailability } from "../../_actions";
import { readFile } from 'fs/promises';

export  function ActiveToggleDropDownItem({
  id,
  isAvailableForPurchase,
}: {
  id:string;
  isAvailableForPurchase:boolean;
    }) {
const [isPending, startTransition] = useTransition();
    return <DropdownMenuItem disabled={isPending} onClick={() => {

        startTransition(async() =>{
            await toggleProductAvailability(id,!isAvailableForPurchase)
        })
    }}>
        {isAvailableForPurchase ? "Deactivate" : "Activate"}
        
  </DropdownMenuItem>;
}



export  function DeleteDropDownItem({ id,filePath }: { id: string}) {
    const [isPending, startTransition] = useTransition();

    return <DropdownMenuItem disabled={isPending} onClick={() => {
        startTransition(async () => {
            await deleteProduct(id)
        
        })
    }}>
        Delete
    
</DropdownMenuItem>
}

