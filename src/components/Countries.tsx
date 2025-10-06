import { useCountry } from "@/app/api/api";
import { useState } from "react";

import { Input } from "@/components/ui/input";
import Link from "next/link";
export default function Countries() {
  const { data: countries, isLoading, error } = useCountry();
  const [search, setSearch] = useState("");

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading countries</p>;

  const filtered = countries?.filter(
    (c) =>
      c.name.common.toLowerCase().includes(search.toLowerCase()) ||
      c.region.toLocaleLowerCase().includes(search.toLocaleLowerCase())
  );

  return (
    <>
      <Input
        placeholder="Search countries..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-6"
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 dark:text-white">
        {filtered?.map((c) => (
          <Link
            key={c.name.common}
            href={`/country/${encodeURIComponent(c.name.common)}`}
            className="p-4 bg-white  dark:bg-black dark:shadow-amber-50 rounded shadow "
          >
            <img
              src={c.flags.png}
              alt={c.name.common}
              className="w-full h-32 object-cover rounded"
            />
            <h2 className="font-bold mt-2">{c.name.common}</h2>
            <p>{c.region}</p>
            <p>{c.capital?.[0]}</p>
          </Link>
        ))}
      </div>
    </>
  );
}
