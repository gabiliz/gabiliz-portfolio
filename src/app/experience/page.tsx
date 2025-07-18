import ExperienceTimeline from "@/components/ExperienceTimeline";
import experiences from "@utils/experiences.json";

export default function Experience() {
  return (
    <div className="relative flex h-full flex-col px-4 pt-14 sm:px-6 lg:px-8">
      <main className="flex-auto py-16">
        <article className="prose dark:prose-invert">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 dark:text-white">Experiences</h1>
          <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">Professional journey:</p>
          <ol className="relative border-l border-violet-200 dark:border-violet-700">
            {experiences.map((experience, index) => (
            <ExperienceTimeline key={index} date={experience.date} title={experience.title} description={experience.description} technologies={experience.technologies} websites={experience.website} />
            ))}
          </ol>
        </article>
      </main>
    </div>
  )
}