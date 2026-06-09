import {
  ArrowDownToLine,
  Banknote,
  BarChart3,
  Boxes,
  ClipboardCheck,
  ClipboardList,
  Cpu,
  Database,
  FileText,
  Home,
  Landmark,
  Layers,
  PackagePlus,
  Receipt,
  Scale,
  Settings,
  Shield,
  Sprout,
  Store,
  Thermometer,
  Truck,
  Upload,
  Users,
  Warehouse,
  type LucideIcon,
} from "lucide-react";

const MAP: Record<string, LucideIcon> = {
  "arrow-down-to-line": ArrowDownToLine,
  banknote: Banknote,
  chart: BarChart3,
  boxes: Boxes,
  "clipboard-check": ClipboardCheck,
  "clipboard-list": ClipboardList,
  cpu: Cpu,
  database: Database,
  "file-text": FileText,
  home: Home,
  landmark: Landmark,
  layers: Layers,
  "package-plus": PackagePlus,
  receipt: Receipt,
  scale: Scale,
  settings: Settings,
  shield: Shield,
  sprout: Sprout,
  store: Store,
  thermometer: Thermometer,
  truck: Truck,
  upload: Upload,
  users: Users,
  warehouse: Warehouse,
};

export function Icon({
  name,
  className,
  size = 18,
}: {
  name: string;
  className?: string;
  size?: number;
}) {
  const Cmp = MAP[name] ?? Boxes;
  return <Cmp className={className} size={size} strokeWidth={1.75} />;
}
