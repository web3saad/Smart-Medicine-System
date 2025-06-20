import { Tooltip } from "@mui/material";
import { CiExport } from "react-icons/ci";
import {
  FaCartPlus,
  FaChartLine,
  FaShuttleVan,
} from "react-icons/fa";
import { MdSell } from "react-icons/md";
import { useGetLastMonthSalesSummaryQuery, useGetRecentOrdersQuery } from "../../redux/features/salesApi";
import SalesCard from "../../components/DashboardComponents/SalesCard";

const DashboardHome = () => {
  const { data: salesSummary, isLoading: summaryLoading } = useGetLastMonthSalesSummaryQuery(undefined);
  const { data: recentOrdersData, isLoading: ordersLoading } = useGetRecentOrdersQuery(undefined);

  if (summaryLoading || ordersLoading) {
    return <div>Loading...</div>;
  }

  const summary = salesSummary?.data || {
    totalOrders: 0,
    totalSales: 0,
    totalDelivered: 0,
    totalPending: 0,
    growth: { sales: 0, orders: 0 }
  };

  const recentOrders = recentOrdersData?.data || [];

  return (
    <div className="px-2 py-4">
      {/* Sales Summary Section */}
      <div className="px-2 shadow-lg bg-white rounded-xl p-4 mb-6">
        <div className="flex justify-between mb-4">
          <p className="font-semibold text-lg">
            Last Month's Sales Summary <br />
            <span className="text-sm text-gray-500">
              Past 30 days overview
            </span>
          </p>
          <Tooltip
            title="Export Monthly Data"
            slotProps={{
              popper: {
                modifiers: [
                  {
                    name: "offset",
                    options: {
                      offset: [0, 5],
                    },
                  },
                ],
              },
            }}
          >
            <p className="text-3xl">
              <CiExport />{" "}
            </p>
          </Tooltip>
        </div>

        <div className="flex justify-center gap-x-1.5">
          <SalesCard
            icon={FaChartLine}
            ammount={`₹ ${summary.totalSales.toFixed(2)}`}
            salesTitle="Total Sales"
            saleRate={summary.growth?.sales?.toFixed(1) || "0.0"}
            position={summary.growth?.sales >= 0 ? "+" : "-"}
            className="text-orange-600"
          />
          <SalesCard
            icon={FaCartPlus}
            ammount={summary.totalOrders.toString()}
            salesTitle="Total Orders"
            saleRate={summary.growth?.orders?.toFixed(1) || "0.0"}
            position={summary.growth?.orders >= 0 ? "+" : "-"}
            className="text-blue-600"
          />
          <SalesCard
            icon={FaShuttleVan}
            ammount={summary.totalDelivered.toString()}
            salesTitle="Delivered Orders"
            saleRate={(summary.totalOrders > 0 ? (summary.totalDelivered / summary.totalOrders * 100) : 0).toFixed(1)}
            position="+"
            className="text-green-600"
          />
          <SalesCard
            icon={MdSell}
            ammount={summary.totalPending.toString()}
            salesTitle="Pending Orders"
            saleRate={(summary.totalOrders > 0 ? (summary.totalPending / summary.totalOrders * 100) : 0).toFixed(1)}
            position="+"
            className="text-yellow-600"
          />
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="px-2 shadow-lg bg-white rounded-xl p-4">
        <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
        {recentOrders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-4 py-2 text-left">Order ID</th>
                  <th className="border px-4 py-2 text-left">Date</th>
                  <th className="border px-4 py-2 text-left">Total</th>
                  <th className="border px-4 py-2 text-left">Payment Status</th>
                  <th className="border px-4 py-2 text-left">Delivery Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order: any) => (
                  <tr key={order._id} className="hover:bg-gray-50">
                    <td className="border px-4 py-2">{order.orderId || "N/A"}</td>
                    <td className="border px-4 py-2">{order.orderDate || "N/A"}</td>
                    <td className="border px-4 py-2">₹{Number(order.total).toFixed(2)}</td>
                    <td className="border px-4 py-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        order.paymentStatus === "completed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {order.paymentStatus || "pending"}
                      </span>
                    </td>
                    <td className="border px-4 py-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        order.delivaryStatus === "delivered" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {order.delivaryStatus || "pending"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-500 my-4">No recent orders found</p>
        )}
      </div>
    </div>
  );
};

export default DashboardHome;
