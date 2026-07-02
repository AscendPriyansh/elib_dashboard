import { Button } from "@/components/ui/button";

function HomePage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <h1 className="font-bold text-xl">Dashboard</h1>
      <div className="min-h-screen flex-1 rounded-xl bg-muted/50 md:min-h-min flex flex-col justify-center items-center gap-3">
        <div className="flex flex-col justify-center items-center">
          <h3 className="font-bold text-lg">You have no books</h3>
          <p className="text-xs text-gray-400">You can start selling as soon as you add a book.</p>
        </div>
        <Button type="button">Add Book</Button>
      </div>
    </div>
  )
}

export default HomePage;