import { Loader2 } from "lucide-react";

export default function AdminLoading() {
    return <div className=" flex justify-center ">
        
        <Loader2 size={36} className=" animate-spin text-primary" />
    </div>
}