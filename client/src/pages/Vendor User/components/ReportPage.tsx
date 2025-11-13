import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { SlidersHorizontal, Eye, Printer, FileText, DollarSign, CheckCircle, XCircle, RefreshCw } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

const summaryStats = [
  {
    icon: FileText,
    label: "Total Orders",
    value: "1239",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    icon: DollarSign,
    label: "Total Sales",
    value: "R12000.00",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
  {
    icon: CheckCircle,
    label: "Confirm orders",
    value: "2",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    icon: XCircle,
    label: "Rejected",
    value: "0",
    color: "text-red-600",
    bgColor: "bg-red-50",
  },
  {
    icon: RefreshCw,
    label: "Change Back",
    value: "R12000.00",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
];

const orders = [
  {
    id: "#00212",
    sku: "11236",
    product: "https://images.unsplash.com/photo-1729605412104-24acd08bd413?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaCUyMHJlc29ydCUyMGhvdGVsfGVufDF8fHx8MTc2MTM5ODIxNnww&ixlib=rb-4.1.0&q=80&w=1080",
    campaignName: "Zanzibar Gateway Weekend",
    customer: "Mzonde,Thato Ukanile bunga & more",
    dates: "11 Aug-12 Dec 2025",
    amount: "R2 000",
    status: "unpaid",
  },
  {
    id: "#00213",
    sku: "11237",
    product: "https://images.unsplash.com/photo-1600555379885-08a02224726d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZm9vZCUyMG1lYWx8ZW58MXx8fHwxNzYxNDQxNjgwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    campaignName: "Cape town Gateway Weekend",
    customer: "Mzonde,Thato Ukanile bunga & more",
    dates: "11 Aug-12 Dec 2025",
    amount: "R5 000",
    status: "unpaid",
  },
  {
    id: "#10156",
    sku: "11238",
    product: "https://images.unsplash.com/photo-1728676692780-8c75ca9105d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2FzdGFsJTIwaG90ZWwlMjBvY2VhbnxlbnwxfHx8fDE3NjE1MDA5NDh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    campaignName: "Cape town Gateway Weekend",
    customer: "Mzonde,Thato Ukanile bunga & more",
    dates: "11 Aug-12 Dec 2025",
    amount: "R5 000",
    status: "unpaid",
  },
  {
    id: "#20058",
    sku: "25871",
    product: "https://images.unsplash.com/photo-1739140019682-05bd100b5a5e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiZWFjaGZyb250JTIwcHJvcGVydHl8ZW58MXx8fHwxNzYxNDY2MDAzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    campaignName: "Magalas park Hartbeespoort dam",
    customer: "Mzonde,Thato Ukanile bunga & more",
    dates: "30 Aug-12 Dec 2025",
    amount: "R12 000",
    status: "paid",
  },
  {
    id: "#65236",
    sku: "00254",
    product: "https://images.unsplash.com/photo-1697618009092-01b24159a55a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMGFjY29tbW9kYXRpb24lMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjE1MDA5NDh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    campaignName: "Sun city Wave water Park",
    customer: "Mzonde,Thato Ukanile bunga & more",
    dates: "01 Nov-12 Dec 2025",
    amount: "R8 000",
    status: "paid",
  },
  {
    id: "#99990",
    sku: "44750",
    product: "https://images.unsplash.com/photo-1759882608768-168d4c3a91c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b3VyJTIwYnVzJTIwdHJhbnNwb3J0fGVufDF8fHx8MTc2MTUwMDk0OXww&ixlib=rb-4.1.0&q=80&w=1080",
    campaignName: "Gold Reef city Theme Park",
    customer: "Mzonde,Thato Ukanile bunga & more",
    dates: "01 Nov-12 Dec 2025",
    amount: "R8 000",
    status: "pending",
  },
];

export function ReportPage() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-green-500 hover:bg-green-600">Paid</Badge>;
      case "unpaid":
        return <Badge className="bg-red-500 hover:bg-red-600">Unpaid</Badge>;
      case "pending":
        return <Badge className="bg-orange-500 hover:bg-orange-600">Pending</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-gray-900">Report</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            Filter By
          </Button>
          <Button variant="outline" size="sm">
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            Sort by
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {summaryStats.map((stat, idx) => {
          const IconComponent = stat.icon;
          return (
            <Card key={idx} className="p-4">
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <IconComponent className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-gray-900">{stat.value}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <Card className="p-6">
        <h2 className="text-gray-900 mb-4">Orders</h2>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Order#</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Campaign Name</TableHead>
                <TableHead>Costumer</TableHead>
                <TableHead>Dates</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>
                    <img
                      src={order.product}
                      alt="Product"
                      className="w-12 h-12 rounded object-cover"
                    />
                  </TableCell>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.sku}</TableCell>
                  <TableCell>{order.campaignName}</TableCell>
                  <TableCell className="max-w-[200px]">
                    <p className="truncate">{order.customer}</p>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">{order.dates}</TableCell>
                  <TableCell>{order.amount}</TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Printer className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
