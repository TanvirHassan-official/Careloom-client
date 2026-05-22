import Banner from "@/components/Banner";
import Category from "@/app/appointments/category/page";
import TopRatedDoctors from "@/components/TopRatedDoctors";
import WhyCareloom from "@/components/Why";


export const metadata = {
  title: "Careloom - Book Top Doctors Near You",
  description: "Browse verified doctors, check availability, and book appointments in minutes.",
};

export default function Home() {
  // const [doctors, setDoctors] = useState([]);

  // useEffect(() => {
  //   fetch(`${process.env.NEXT_PUBLIC_API_URL}/doctors`)
  //     .then(res => res.json())
  //     .then(data => setDoctors(data))
  //     .catch(err => console.error("Fetch error:", err));
  // }, []);

  return (
    <div>
      <Banner/>
      <TopRatedDoctors/>
      <WhyCareloom/>
      <Category/>
    </div>
  );
}