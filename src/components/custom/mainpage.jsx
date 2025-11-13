import { Button } from "@/components/ui/button";
import Navbar from "./navbar";
export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4">
      <Navbar />
      <p className="text-xl text-center mb-12 mt-8 font-medium">
        Welcome to Ideation!
      </p>

      <div className="flex gap-6">
        <Button className="rounded-lg" size="lg">Start</Button>
        <Button className="rounded-lg border border-black" variant="secondary" size="lg"> About </Button>
      </div>
      
    </main>
  );
}
