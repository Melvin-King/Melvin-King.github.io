import Image from "next/image";

export interface ExperienceProps {
  occupation: string;
  affiliation: string;
  period: string;
  location: string;
  description?: string[];
  logo: string;
  advisor?: {
    name: string;
    occupation: string;
    url?: string; // 新增：可选的跳转链接
  };
}

export default function ExperienceItem({
  occupation,
  affiliation,
  period,
  location,
  description = [],
  logo,
  advisor,
}: ExperienceProps) {
  return (
    <div className="flex gap-4 md:gap-8 py-8 border-b border-gray-100 dark:border-gray-800 last:border-none">
      <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 relative overflow-hidden">
        <Image
          src={logo}
          alt={affiliation}
          fill
          className="object-contain"
        />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
          <h3 className="text-lg font-bold text-purple-600 dark:text-purple-400">
            {occupation}
          </h3>
          <span className="text-xs md:text-sm text-gray-500 dark:text-gray-400 shrink-0 font-medium tabular-nums">
            {period} | {location}
          </span>
        </div>
        
        <p className="text-base font-semibold text-gray-900 dark:text-gray-100 mt-0.5">
          {affiliation}
        </p>

        {description.length > 0 && (
          <ul className="mt-3 space-y-1.5">
            {description.map((item, idx) => (
              <li key={idx} className="flex items-start text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                <span className="mr-2.5 mt-2 h-1 w-1 shrink-0 rounded-full bg-gray-300 dark:bg-gray-600" />
                {item}
              </li>
            ))}
          </ul>
        )}

        {advisor && (
          <p className="mt-3 text-sm italic text-gray-500 dark:text-gray-400">
            Advisor:{" "}
            {advisor.url ? (
              <a 
                href={advisor.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 dark:text-purple-400 not-italic font-medium hover:underline decoration-2 underline-offset-4 transition-all"
              >
                {advisor.name}
              </a>
            ) : (
              <span className="text-purple-600 dark:text-purple-400 not-italic font-medium">
                {advisor.name}
              </span>
            )}{" "}
            {advisor.occupation}
          </p>
        )}
      </div>
    </div>
  );
}