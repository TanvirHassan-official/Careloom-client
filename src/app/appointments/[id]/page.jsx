import DoctorDetailsPage from "@/components/clientPages/Doctors";
import { authClient } from "@/lib/auth-client";

export async function generateMetadata({ params }) {
  const { id } = await params;
const { data: tokenData } = await authClient.token()
  // example: fetch doctor/appointment info
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/doctors/${id}`,{
    headers: {
      authorization: `Bearer ${tokenData}`
    }
  });
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