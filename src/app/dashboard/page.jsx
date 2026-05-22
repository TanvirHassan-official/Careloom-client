import DashboardPage from "@/components/clientPages/Dashboard";

export const metadata = {
  title: "Dashboard - Careloom",
  description: "Update profile & appointments in minutes.",
};

const page = () => {
  return (
    <div>
      <DashboardPage/>
    </div>
  );
};

export default page;