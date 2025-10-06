"use client";

import { useCountry } from "./api/api";

import { useState } from "react";
import { ModeToggle } from "@/components/ModeToggle";
import Countries from "@/components/Countries";

export default function HomePage() {
  

  return (
    <div className=" grid gap-2 p-6  max-w-5xl mx-auto">
      <ModeToggle/>
      <Countries/>
    </div>
  );
}
