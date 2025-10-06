"use client"
import { useQuery } from "@tanstack/react-query";

export interface Country{
    cca3:string;
    name:{
        common:string;
        official:string;
         nativeName?: Record<string, { official: string; common: string }>;
  };
   flags:{
    png:string;
    svg:string;

   };
  capital?: string[];
  region: string;
  subregion?: string;
  population: number;
    }

const fetchCountries=async():Promise<Country[]>=>{
     const  res=await fetch("https://restcountries.com/v3.1/all?fields=flags,name,capital,population,region");
    if(!res.ok) throw new Error("faield to fetch")
    return res.json();
};
export const useCountry=()=>{
    return useQuery<Country[]>({
        queryKey:["countries"],
        queryFn:fetchCountries,
         staleTime: 1000 * 60 * 5,
    })
}