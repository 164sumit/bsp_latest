import Navbar from "@/components/Navbar";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col h-screen bg-dc2 px-1 py-1   " >
        <Navbar />
        {children}
     
    </section>
  );
}
