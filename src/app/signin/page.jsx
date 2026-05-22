import SignInPage from "@/components/clientPages/Signin";

export const metadata = {
  title: "Signin - Careloom",
  description: "Get ready to take appointments.",
};


const page = () => {
    return (
        <div>
           <SignInPage/> 
        </div>
    );
};

export default page;