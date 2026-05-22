import DoctorDetailsPage from "@/components/clientPages/Doctors";

export async function generateMetadata({ params }) {
  const { id } = await params;

  // example: fetch doctor/appointment info
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/doctors/${id}`);
  const data = await res.json();

  return {
    title: `${data.name} | Careloom`,
    description: `View appointment details for ${data.name}`,
  };
}

const page = () => {
  return (
    <div>
      <DoctorDetailsPage/>
    </div>
  );
};

export default page;