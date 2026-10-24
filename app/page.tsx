import { Portfolio } from "@/components/portfolio";
import { projects } from "@/data/projects";

export default function Home() {
  return <Portfolio projects={projects} />;
}
