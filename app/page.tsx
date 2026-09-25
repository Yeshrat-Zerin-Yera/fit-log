import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black text-white">
        <div className="flex min-h-[70vh] items-center justify-center">
          <h1 className="text-5xl font-black">
            FITLOG
          </h1>
        </div>
      </main>
    </>
  );
}