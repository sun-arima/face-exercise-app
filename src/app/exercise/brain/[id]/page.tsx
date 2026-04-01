import BrainClient from "./BrainClient";

export function generateStaticParams() {
  return [
    { id: "brain-1" },
    { id: "brain-2" },
    { id: "brain-3" },
    { id: "brain-4" },
  ];
}

export default function Page() {
  return <BrainClient />;
}
