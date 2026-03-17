import { menus } from "@/lib/dummyData";
import SessionClient from "./SessionClient";

export function generateStaticParams() {
  return menus.map((m) => ({ id: m.id }));
}

export default function Page() {
  return <SessionClient />;
}
