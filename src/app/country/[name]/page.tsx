
import { ModeToggle } from "@/components/ModeToggle";

export default async function CountryDetailPage({ params }: any) {
 
  if (!params?.name) return <p>Country name not provided.</p>;
  const countryName=decodeURIComponent(params.name);
  const res = await fetch(
    `https://restcountries.com/v3.1/name/${encodeURIComponent(countryName)}?fields=name,flags,population,region,subregion,capital`,
    { cache: "no-store" }
  );

  if (!res.ok) throw new Error("Failed to fetch country");

  const data = await res.json();
  const country =
    data.find(
      (c: any) =>
        c.name.common.toLowerCase() === params.name.toLowerCase()
    ) || data[0];

  return (
    <div className="flex flex-col h-screen gap-2 pt-4 justify-center items-center shadow dark:text-white">
      <ModeToggle />
      <div className="shadow p-8 dark:shadow-white rounded">
        <img
          src={country.flags.svg}
          alt={country.name.common}
          className="w-64 h-40 object-cover rounded mb-6"
        />
        <h1 className="text-3xl font-bold mb-4">{country.name.common}</h1>
        <p>
          <strong>Population:</strong> {country.population.toLocaleString()}
        </p>
        <p>
          <strong>Region:</strong> {country.region}
        </p>
        <p>
          <strong>Subregion:</strong> {country.subregion}
        </p>
        <p>
          <strong>Capital:</strong> {country.capital?.[0] ?? "No capital"}
        </p>
      </div>
    </div>
  );
}

