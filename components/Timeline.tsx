import { Milestone } from "@/types";
import Image from "next/image";
import Link from "next/link";

interface TimelineProps {
  milestones: Milestone[];
}

export default function Timeline({ milestones }: TimelineProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = date.toLocaleDateString("es-ES", { month: "long" });
    const year = date.getFullYear();
    return `${month.charAt(0).toUpperCase() + month.slice(1)} ${year}`;
  };

  const calculateAge = (dateString: string) => {
    const milestoneDate = new Date(dateString);
    const birthDate = new Date("1995-05-05");
    let age = milestoneDate.getFullYear() - birthDate.getFullYear();
    const monthDiff = milestoneDate.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && milestoneDate.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  return (
    <div className="relative">
      <div className="absolute left-4 md:left-1/2 h-full w-0.5 bg-slate-700 transform -translate-x-1/2" />

      {milestones.map((milestone, index) => (
        <div
          key={milestone.id}
          id={`milestone-${milestone.id}`}
          className={`relative flex items-center justify-between mb-12 md:mb-16 ${
            index % 2 === 0 ? "md:flex-row-reverse" : ""
          }`}
        >
          <div
            className={`flex-1 ${
              index % 2 === 0 ? "md:text-right" : "md:text-left"
            } md:px-8 pl-12`}
          >
            <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="text-sm text-blue-400 font-semibold mb-2">
                {formatDate(milestone.date)} • {calculateAge(milestone.date)}{" "}
                años
              </div>
              <Link
                href={
                  milestone.slug
                    ? `/posts/${milestone.slug}?milestone=${milestone.id}`
                    : "#"
                }
              >
                <h3 className="text-xl font-bold text-white mb-3">
                  {milestone.title}
                </h3>
              </Link>
              <p className="text-gray-300 leading-relaxed [word-break:break-word]">
                {milestone.description}
              </p>
              {milestone.slug && (
                <Link
                  href={
                    milestone.slug
                      ? `/posts/${milestone.slug}?milestone=${milestone.id}`
                      : "#"
                  }
                  className="inline-block mt-4 text-blue-400 hover:text-blue-300 font-medium transition-colors"
                >
                  Leer más →
                </Link>
              )}
              {milestone.image && (
                <div className="mt-4 rounded-lg overflow-hidden">
                  <Image
                    src={`/images_opt/${milestone.image}`}
                    alt={milestone.title}
                    width={1000}
                    height={1000}
                    className="w-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-blue-400 rounded-full border-4 border-gray-900 shadow-lg transform -translate-x-1/2 z-10" />

          <div className="hidden md:block flex-1 md:px-8" />
        </div>
      ))}
    </div>
  );
}
