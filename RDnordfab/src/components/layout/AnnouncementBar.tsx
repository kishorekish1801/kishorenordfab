import { Leaf, ShieldCheck, Truck } from "lucide-react";

export default function AnnouncementBar() {
  return (
    <div className="announcement-bar">
      <div className="announcement-inner">
        <span><Truck size={15} strokeWidth={2.2} /> Free shipping across Europe on orders over 999 SEK</span>
        <i />
        <span className="announcement-mid"><Leaf size={15} strokeWidth={2.2} /> Sustainable 3D printing</span>
        <i />
        <span className="announcement-quality"><ShieldCheck size={15} strokeWidth={2.2} /> Premium quality</span>
        <button className="language-trigger" aria-label="Choose language">EN / SV <span>⌄</span></button>
      </div>
    </div>
  );
}
