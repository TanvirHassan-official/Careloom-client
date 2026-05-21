'use client';

import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";

export default function Home() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/doctors`)
      .then(res => res.json())
      .then(data => setDoctors(data))
      .catch(err => console.error("Fetch error:", err));
  }, []);

  return (
    <div>
      <Navbar />

      {doctors.map((doc, index) => (
        <div key={index}>
          <h3 className="text-black">{doc.name}</h3>
        </div>
      ))}
    </div>
  );
}