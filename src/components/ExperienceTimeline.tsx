interface ExperienceTimelineProps {
  date: string
  title: string
  description: string
  technologies: string[]
}

export default function ExperienceTimeline({ date, title, description, technologies }: ExperienceTimelineProps) {
  return (
    <li className="ml-4 max-w-2xl">
      <div className="absolute w-3 h-3 bg-violet-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-violet-900 dark:bg-violet-700"></div>
      <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{date}</time>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
      <p className="text-base font-normal text-gray-500 dark:text-gray-400">{description}</p>
      <div className="my-2 flex flex-wrap">
        {technologies.map((technology, index) => (
          <span
            key={index}
            className="bg-violet-100 text-violet-800 my-1 text-xs font-medium mr-2 px-3 py-1 rounded-full dark:bg-violet-400/10 dark:text-violet-300"
          >
            {technology}
          </span>
        ))}
      </div>
    </li>
  )
}