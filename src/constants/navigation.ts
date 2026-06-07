import { 
  LayoutDashboard, 
  CircleDollarSign, 
  Receipt, 
  Calculator 
} from "lucide-react";

export const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Income", href: "/income", icon: CircleDollarSign },
  { label: "Expenses", href: "/expenses", icon: Receipt },
  { label: "Taxes", href: "/taxes", icon: Calculator },
];
