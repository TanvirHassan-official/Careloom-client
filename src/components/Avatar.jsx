/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { authClient } from '@/lib/auth-client';

const Avatar = () => {
    const userData = authClient.useSession();
    const user = userData.data?.user;

        const initials = user?.name
        ?.split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
        
    return (
        <Link href="/profile">
            <div className="avatar cursor-pointer">
                <div className="w-9 rounded-full ring ring-[#386FA4] ring-offset-1 ring-offset-white hover:ring-[#133C55] transition-all duration-300">
                    {user?.image ? (
                        <img
                            src={user.image}
                            alt="profile"
                            referrerPolicy="no-referrer"
                            onError={(e) => { e.currentTarget.style.display = "none"; }}
                        />
                    ) : (
                        <div className="bg-[#386FA4] text-black flex items-center justify-center w-full h-full text-sm font-bold rounded-full">
                            {initials}
                        </div>
                    )}
                </div>
            </div>
        </Link>
    );
};

export default Avatar;


