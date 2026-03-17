import { menus } from "@/lib/dummyData";
import GuideClient from "./GuideClient";

export function generateStaticParams() {
  return menus.map((m) => ({ id: m.id }));
}

export default function Page() {
  return <GuideClient />;
}
