

export default async function CountryDetailPage(props:{
  params:{name:string}
} ){
   const{name}=props.params;
  const res = await fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,flags,population,region,subregion,capital`
  );
  if (!res.ok) throw new Error("Failed to fetch country");
  const data = await res.json();
  const country = data[0];

  return (
    <div className="flex h-full w-full justify-center items-center">
      <div className="   p-8 ">
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
