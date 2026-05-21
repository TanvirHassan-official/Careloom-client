import Link from "next/link";
import Image from "next/image";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faStar, faLocationDot, faClock, faStethoscope } from "@fortawesome/free-solid-svg-icons";

const DoctorCard = ({ doctor }) => {
    return (
        <div className="group bg-white rounded-2xl border border-[#E5E7EB] hover:border-[#7C3AED] hover:shadow-xl hover:shadow-[#7C3AED]/10 transition-all duration-300 overflow-hidden">

            {/* Top Section — horizontal layout */}
            <div className="flex gap-4 p-5">

                {/* Avatar */}
                <div className="relative shrink-0">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-[#EDE9FE]">
                        <Image
                            src={doctor.image}
                            alt={doctor.name}
                            width={80}
                            height={80}
                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                        />
                    </div>
                    {/* Online dot */}
                    <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#059669] rounded-full border-2 border-white" />
                </div>

                {/* Info */}
                <div className="flex flex-col gap-1 flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                        <h2 className="text-base font-bold text-[#1C1917] leading-tight truncate">
                            {doctor.name}
                        </h2>
                        {/* Rating pill */}
                        <div className="flex items-center gap-1 bg-[#EDE9FE] px-2 py-0.5 rounded-full shrink-0">
                            {/* <FontAwesomeIcon icon={faStar} className="text-[#7C3AED]" width={10} /> */}
                            <span className="text-xs font-bold text-[#7C3AED]">{doctor.rating}</span>
                        </div>
                    </div>

                    {/* Specialty */}
                    <div className="flex items-center gap-1.5">
                        {/* <FontAwesomeIcon icon={faStethoscope} className="text-[#7C3AED]" width={12} /> */}
                        <span className="text-sm font-semibold text-[#7C3AED]">{doctor.specialty}</span>
                    </div>

                    {/* Hospital */}
                    <p className="text-xs text-[#78716C] truncate">{doctor.hospital}</p>

                    {/* Location */}
                    <div className="flex items-center gap-1">
                        {/* <FontAwesomeIcon icon={faLocationDot} className="text-[#78716C]" width={10} /> */}
                        <span className="text-xs text-[#78716C]">{doctor.location}</span>
                    </div>
                </div>
            </div>

            {/* Divider */}
            <div className="h-px w-full bg-[#E5E7EB]" />

            {/* Middle Section — stats */}
            <div className="grid grid-cols-2 gap-px bg-[#E5E7EB] mx-5">
                <div className="bg-white py-3 flex flex-col items-center">
                    <span className="text-sm font-bold text-[#1C1917]">{doctor.experience}</span>
                    <span className="text-xs text-[#78716C]">Experience</span>
                </div>
                <div className="bg-white py-3 flex flex-col items-center">
                    <span className="text-sm font-bold text-[#1C1917]">৳{doctor.fee}</span>
                    <span className="text-xs text-[#78716C]">Per Visit</span>
                </div>
            </div>

            {/* Availability */}
            <div className="px-5 py-3 flex items-start gap-2">
                {/* <FontAwesomeIcon icon={faClock} className="text-[#7C3AED] mt-0.5 shrink-0" width={12} /> */}
                <div className="flex flex-wrap gap-1">
                    {doctor.availability.map((slot, i) => (
                        <span
                            key={i}
                            className="text-xs bg-[#EDE9FE] text-[#5B21B6] font-medium px-2 py-0.5 rounded-full"
                        >
                            {slot}
                        </span>
                    ))}
                </div>
            </div>

            {/* Divider */}
            <div className="h-px w-full bg-[#E5E7EB]" />

            {/* Bottom CTA */}
            <div className="flex items-center justify-between px-5 py-4">
                <span className="text-xs text-[#059669] font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#059669] inline-block" />
                    Available Today
                </span>
                <Link href={`/doctors/${doctor._id}`}>
                    <button className="px-4 py-2 bg-[#7C3AED] hover:bg-[#5B21B6] text-white text-xs font-semibold rounded-xl transition-all duration-300 hover:shadow-md hover:shadow-[#7C3AED]/30">
                        View Details →
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default DoctorCard;