import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
import Loading from "./loading";
import prisma from "@/db/db";
import { formatNumber } from "@/lib/formatters";
import { formatCurrency } from "./../../lib/formatters";
async function getSalesData() {
  const data = await prisma.order.aggregate({
    _sum: { pricePaidInCents: true },
    _count: true,
  });
  return {
    amount: (data._sum.pricePaidInCents || 0) / 100,
    numberOfSales: data._count,
  };
}
async function getUsersData() {
  const [userCount, orderData] = await Promise.all([
    prisma.user.count(),

    prisma.order.aggregate({
      _sum: { pricePaidInCents: true },
    }),
  ]);
  return {
    userCount,
    averageValuePerUser:
      userCount === 0 ? 0 : (orderData._sum.pricePaidInCents || 0) / 100,
  };
}
async function getProductsData() {
  const [activeCount, inactiveCount] = await Promise.all([
    await prisma.product.count({ where: { isAvailableForPurchase: true } }),
    await prisma.product.count({ where: { isAvailableForPurchase: false } }),
  ]);
  return { activeCount, inactiveCount };
}
type DashboardCardProps = {
  title: string;
  subtitle: string;
  body: string;
};

export default async function AdminDashboard() {
  const [SalesData, UsersData, productData] = await Promise.all([
    getSalesData(),
    getUsersData(),
    getProductsData(),
  ]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
      <DashboardCard
        title="Sales"
        subtitle={`${formatNumber(SalesData.numberOfSales)} orders`}
        body={formatCurrency(SalesData.amount)}
      />
      <DashboardCard
        title="Users"
        subtitle={`${formatCurrency(
          UsersData.averageValuePerUser
        )} average value`}
        body={formatNumber(UsersData.userCount)}
      />
      <DashboardCard
        title="Active Products"
        subtitle={`${formatNumber(productData.inactiveCount)} inactive`}
        body={formatNumber(productData.activeCount)}
      />
    </div>
  );
}

function DashboardCard({ title, subtitle, body }: DashboardCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className=" text-primary">{title}</CardTitle>
        <CardDescription>{subtitle} </CardDescription>
      </CardHeader>
      <CardContent>
        <p>{body}</p>
      </CardContent>
    </Card>
  );
}
