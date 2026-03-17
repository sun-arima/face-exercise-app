import { menus } from "@/lib/dummyData";
import ResultClient from "./ResultClient";

export function generateStaticParams() {
  return menus.map((m) => ({ id: m.id }));
}

export default function Page() {
  return <ResultClient />;
}
