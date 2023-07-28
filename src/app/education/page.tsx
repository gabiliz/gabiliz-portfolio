import EducationContent from "@/components/EducationContent";
import education from "@utils/education.json";

export default function Education() {
  return (
    <div className="relative flex h-full flex-col px-4 pt-14 sm:px-6 lg:px-8">
      <main className="flex-auto py-16">
        <article className="prose dark:prose-invert">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 dark:text-white">Education</h1>
          <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">Here&apos;s my academic history and some courses certificates:</p>
          {education.map((education, index) => (
            <EducationContent key={index} title={education.title} date={education.date} institution={education.institution} logo={education.logo} />
            ))}
        </article>
      </main>
    </div>
  )
}