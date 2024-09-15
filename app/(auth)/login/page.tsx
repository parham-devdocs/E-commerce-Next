import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Login } from "./_action";

export default function LoginPage() {
  return (
    <form className=" flex justify-center items-center w-full h-screen bg-yellow-100" action={Login}>
      <Card className=" w-1/3 ">
        <CardHeader>
          <CardTitle className=" text-center">
            <span className=" text-primary ">L</span>ogin
          </CardTitle>
        </CardHeader>
        <CardContent className=" flex flex-col gap-8">
          <div className=" space-y-4">
            <Label htmlFor="password">Email</Label>

            <Input
              type="text"
              name="email"
              id="email"
              required
              className=" focus:border-2 focus:border-primary transition-colors duration-300"
            />
          </div>
          <div className=" space-y-4">
            <Label htmlFor="password">Password</Label>

            <Input
              type="password"
              name="password"
              id="password"
              required
              className=" focus:border-2 focus:border-primary transition-colors duration-300"
            />
          </div>
          <Button className=" hover:bg-white border-2 border-primary transition-colors duration-500 ease-in-out">
            Login
          </Button>
        </CardContent>
      </Card>
    </form>
  );
}
