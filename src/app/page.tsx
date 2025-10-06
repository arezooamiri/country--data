"use client";

import { useCountry } from "./api/api";

import { useState } from "react";

export default function HomePage() {
  const { data: countries, isLoading, error } = useCountry()
  const [search, setSearch] = useState("");

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading countries</p>;

  const filtered = countries?.filter((c) =>
    c.name.common.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* <Input
        placeholder="Search countries..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-6"
      /> */}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {filtered?.map((c) => (
          <div key={c.cca3} className="p-4 bg-white rounded shadow">
            <img src={c.flags.png} alt={c.name.common} className="w-full h-32 object-cover rounded" />
            <h2 className="font-bold mt-2">{c.name.common}</h2>
            <p>{c.region}</p>
            <p>{c.capital?.[0]}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
