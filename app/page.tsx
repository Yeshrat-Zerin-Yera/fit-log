import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />

      <section
        id="library"
        className="min-h-screen bg-black px-4 py-20 text-white"
      >
        <div className="mx-auto max-w-7xl">
          <h2 className="text-4xl font-black uppercase">
            THE LIBRARY
          </h2>

          <p className="mt-2 text-gray-400">
            Twelve lifts covering every major muscle group.
          </p>
        </div>
      </section>
    </>
  );
}