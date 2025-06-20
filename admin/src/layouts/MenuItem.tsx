import { FaBorderAll, FaFileInvoice, FaUser, FaClipboardList } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";
import { MdDashboard, MdOutlineAttachMoney } from "react-icons/md";
import { RiLogoutCircleLine } from "react-icons/ri";

const MenuItems = [
  { id: 1, icon: MdDashboard, text: "Dashboard", link: "/dashboard" },
  // {
  //   id: 2,
  //   icon: MdOutlineAttachMoney,
  //   text: "Financial Dashboard",
  //   link: "/financial-dashboard",
  // },
  { id: 3, icon: IoMdAddCircle, text: "Products", link: "/products" },
  {
    id: 4,
    icon: FaBorderAll,
    text: "Order Management",
    link: "/order-management",
  },
  {
    id: 12,
    icon: FaClipboardList,
    text: "ProductRequests",
    link: "/product-requests",
  },
  {
    id: 9,
    icon: FaUser,
    text: "Users",
    className: "text-white",
    link: "/users",
  },
  { id: 8, icon: FaFileInvoice, text: "Invoice", link: "/invoice" },
  { id: 11, icon: RiLogoutCircleLine, text: "Logout", link: "/logout" },
];

export default MenuItems;
