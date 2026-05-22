import Appointments from "@/components/clientPages/Appointments";

export const metadata = {
  title: "Appointments - Careloom",
  description: "Browse verified doctors, check availability, and book appointments in minutes.",
};

const page = () => {
  return (
    <div>
      <Appointments/>
    </div>
  );
};

export default page;