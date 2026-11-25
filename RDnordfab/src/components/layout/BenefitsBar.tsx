import { Award, Box, Leaf, Truck, Wrench } from "lucide-react";
const benefits = [
  { icon: Leaf, title: "Sustainable", subtitle: "Materials" },
  { icon: Box, title: "High Quality", subtitle: "3D Printing" },
  { icon: Award, title: "Durability", subtitle: "& Precision" },
  { icon: Truck, title: "Fast Delivery", subtitle: "Across Europe" },
  { icon: Wrench, title: "Customisation", subtitle: "& Design" }
];
export default function BenefitsBar() {
  return <div className="benefits-strip"><div className="page-container benefits-grid">{benefits.map(({ icon: Icon, title, subtitle }) => <div className="benefit-item" key={title}><Icon size={32} strokeWidth={1.6} /><span><strong>{title}</strong><small>{subtitle}</small></span></div>)}</div></div>;
}
