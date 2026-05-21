"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import DoctorCard from "@/components/doctorCard";

export default function CategoryPage() {
  const params = useParams();
  const specialty = params?.specialty;

  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  const formatted = specialty?.replace(/-/g, " ") || "";

  useEffect(() => {
    if (!specialty) return;

    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/doctors/?specialty=${specialty}`
    )
      .then((r) => r.json())
      .then((d) => {
        setDoctors(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));

  }, [specialty]);

  return (
    <div>
      {doctors.map((doc) => (
        <DoctorCard key={doc._id} doctor={doc} />
      ))}
    </div>
  );
}