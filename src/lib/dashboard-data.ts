// Dummy data backing the Warehouse Dashboard. Swap for real API calls later.

export const kpis = [
  { label: "Total Capacity", value: "5,000 MT", sub: "Design Capacity", icon: "warehouse" },
  { label: "Occupied Capacity", value: "5,000 MT", sub: "76.4% Utilized", icon: "boxes" },
  { label: "Total Commodities", value: "125", sub: "Agri-Commodities", icon: "sprout" },
  { label: "Active Depositors", value: "125", sub: "Farmers/FPOs/Traders", icon: "users" },
  { label: "Warehouse Receipts", value: "412", sub: "Active eNWR", icon: "receipt" },
  { label: "Loan Linked", value: "4.80 Cr", sub: "Against Stored Stock", icon: "landmark" },
] as const;

export const capacity = {
  utilized: 76.4,
  segments: [
    { label: "Occupied", value: 3820, color: "#1b5e3f" },
    { label: "Available", value: 1180, color: "#e5e7eb" },
  ],
  totalCapacity: 5000,
};

export const commodities = [
  { label: "Wheat", value: 2050, pct: "53.7%", color: "#1b5e3f" },
  { label: "Rice", value: 980, pct: "25.7%", color: "#eab308" },
  { label: "Maize", value: 450, pct: "11.8%", color: "#3b82f6" },
  { label: "Pulses", value: 220, pct: "5.8%", color: "#8b5cf6" },
  { label: "Coffee", value: 120, pct: "3.0%", color: "#c4b5fd" },
];

export const dailyOutward = [
  { label: "10May", value: 180 },
  { label: "11May", value: 150 },
  { label: "12May", value: 260 },
  { label: "13May", value: 200 },
  { label: "14May", value: 230 },
  { label: "15May", value: 290 },
  { label: "16May", value: 470 },
];

export const dailyInward = [
  { label: "10May", value: 200 },
  { label: "11May", value: 150 },
  { label: "12May", value: 320 },
  { label: "13May", value: 430 },
  { label: "14May", value: 240 },
  { label: "15May", value: 300 },
  { label: "16May", value: 280 },
];

export const alerts = [
  {
    icon: "thermometer",
    tone: "red",
    title: "High Temperature Alert",
    detail: "Stack A3 - Temperature 33.2°C",
    time: "10 min ago",
  },
  {
    icon: "clipboard-check",
    tone: "amber",
    title: "Inspection Due",
    detail: "5 Stacks are due for quality inspection",
    time: "1 hour ago",
  },
  {
    icon: "shield",
    tone: "amber",
    title: "Insurance Expiring Soon",
    detail: "Policy for Rice 1400 MT expires 15 days",
    time: "2 hours ago",
  },
  {
    icon: "scale",
    tone: "amber",
    title: "Weighbridge Calibration Due",
    detail: "Calibration due on 20 May 2024",
    time: "8 hours ago",
  },
] as const;

export const quickActions = [
  { label: "New Inward / Intake", icon: "arrow-down-to-line" },
  { label: "Generate eNWRs", icon: "file-text" },
  { label: "Quality Inspection", icon: "clipboard-check" },
  { label: "Pledge to Bank", icon: "landmark" },
  { label: "Outward / Dispatch", icon: "truck" },
  { label: "View Inventory", icon: "boxes" },
  { label: "Create Lot", icon: "package-plus" },
  { label: "Upload Document", icon: "upload" },
] as const;

export const recentEnwrs = [
  { receipt: "KRSI/WH/24-25/452", commodity: "Wheat", qty: "100 MT", depositor: "Rajesh Kumar", date: "16 May 2024", status: "Active" },
  { receipt: "KRSI/WH/24-25/451", commodity: "Rice", qty: "80 MT", depositor: "Suresh Yadav", date: "16 May 2024", status: "Active" },
  { receipt: "KRSI/WH/24-25/450", commodity: "Maize", qty: "60 MT", depositor: "Mahesh Patel", date: "16 May 2024", status: "Active" },
  { receipt: "KRSI/WH/24-25/449", commodity: "Pulses", qty: "50 MT", depositor: "Ramesh Singh", date: "16 May 2024", status: "Active" },
  { receipt: "KRSI/WH/24-25/448", commodity: "Wheat", qty: "150 MT", depositor: "Neeraj Verma", date: "16 May 2024", status: "Pledge" },
];

export const loanRequests = [
  { id: "KRSI/LN/24-25/112", depositor: "Wheat", amount: "100 MT", lender: "Rajesh Kumar", date: "16 May 2024", status: "Active" },
  { id: "KRSI/LN/24-25/111", depositor: "Rice", amount: "80 MT", lender: "Suresh Yadav", date: "16 May 2024", status: "Active" },
  { id: "KRSI/LN/24-25/110", depositor: "Maize", amount: "60 MT", lender: "Mahesh Patel", date: "16 May 2024", status: "Active" },
  { id: "KRSI/LN/24-25/109", depositor: "Pulses", amount: "50 MT", lender: "Ramesh Singh", date: "16 May 2024", status: "Active" },
  { id: "KRSI/LN/24-25/108", depositor: "Wheat", amount: "150 MT", lender: "Neeraj Verma", date: "16 May 2024", status: "Pledge" },
];

export const shortcuts = [
  { label: "eNWRs Registry", icon: "file-text" },
  { label: "Inventory Report", icon: "clipboard-list" },
  { label: "Farmer / Depositor List", icon: "users" },
  { label: "Loan Requests", icon: "banknote" },
] as const;

export type NavItem = {
  label: string;
  icon: string;
  href?: string;
  children?: { label: string; href: string }[];
};

export const sidebarNav: NavItem[] = [
  { label: "Dashboard", icon: "home", href: "/dashboard" },
  {
    label: "Inward / Intake",
    icon: "arrow-down-to-line",
    children: [
      { label: "Booking", href: "/dashboard/inward/booking" },
      { label: "New Intake", href: "/dashboard/inward/new-intake" },
      { label: "Intake List", href: "/dashboard/inward/intake-list" },
    ],
  },
  { label: "Quality Inspection", icon: "clipboard-check" },
  { label: "eNWRs / Receipts", icon: "receipt" },
  { label: "Inventory", icon: "boxes" },
  { label: "Stack / Location", icon: "layers" },
  { label: "Pledge & Finance", icon: "landmark" },
  { label: "Outward /Dispatch", icon: "truck" },
  { label: "Marketplace", icon: "store" },
  { label: "Reports & Analytics", icon: "chart" },
  { label: "IoT Monitoring", icon: "cpu" },
  { label: "Insurance", icon: "shield" },
  { label: "Audit & Compliance", icon: "clipboard-list" },
  { label: "Master Data", icon: "database" },
  { label: "Settings", icon: "settings" },
];
