import Image from "next/image";


interface EducationContentProps {
  title: string
  date: string
  institution: string
  logo: string
}

export default function EducationContent({ title, date, institution, logo }: EducationContentProps) {
  return (
    <div className="p-4 border-gray-200 rounded-lg shadow sm:p-8 dark:border-gray-700 max-w-2xl">
      <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
        <li className="py-3 sm:py-4">
          <div className="flex items-center space-x-4">
              <Image width={32} height={32} className="rounded-xl" src={logo} alt="Institution Logo" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {title}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {institution}
              </p>
            </div>
            <div className="inline-flex items-center text-sm text-gray-900 dark:text-white">
              {date}
            </div>
          </div>
        </li>
      </ul>
    </div>

  )
}