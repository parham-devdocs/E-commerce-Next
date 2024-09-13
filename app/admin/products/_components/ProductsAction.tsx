"use client";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useState, useTransition } from "react";
import { deleteProduct, toggleProductAvailability } from "../../_actions";
import { useRouter } from "next/navigation";
import  fs  from 'fs/promises';

export function ActiveToggleDropDownItem({
  id,
  isAvailableForPurchase,
}: {
  id: string;
  isAvailableForPurchase: boolean;
}) {
    const [isPending, startTransition] = useTransition();
    const router=useRouter()
  return (
    <DropdownMenuItem
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
            await toggleProductAvailability(id, !isAvailableForPurchase);
            router.refresh()
        });
      }}
    >
      {isAvailableForPurchase ? "Deactivate" : "Activate"}
    </DropdownMenuItem>
  );
}

export function DeleteDropDownItem({
  id,
  disabled,
}: {
  id: string;
  disabled: boolean;
}) {
    const [isPending, startTransition] = useTransition();
    const router=useRouter()
    return (
      <DropdownMenuItem
          variant="destructive"
          disabled={disabled}
          
      className=" text-red-700 mt-3"
      onClick={() => {
        startTransition(async () => {
            await deleteProduct(id);
            router.refresh()
            
        });
      }}
    >
      Delete
    </DropdownMenuItem>
  );
}
