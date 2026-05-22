import Specialists from "@/components/clientPages/Specialists";

export async function generateMetadata({ params }) {
  const { speciality } = await params;

  return {
    title: `${speciality} | Careloom`,
    description: `View appointment details for ${speciality}`,
  };
}

const page = () => {
  return (
    <div>
      <Specialists/>
    </div>
  );
};

export default page;