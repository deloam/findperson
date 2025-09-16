import CardDashboard from "@/app/components/CardDashboard";

export default function HomePage() {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <header className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-700">
          Painel Eduardo
        </h1>
        <p className="text-md text-gray-500 mt-2">
          Dados organizados dos parentes.
        </p>
      </header>

      <CardDashboard />
    </div>
  );
}