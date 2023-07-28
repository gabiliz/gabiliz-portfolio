import ProjectCard from "@/components/ProjectCard";
import projects from "@utils/projects.json";

export default function Projects() {
  return (
    <div className="relative flex h-full flex-col px-4 pt-14 sm:px-6 lg:px-8">
      <main className="flex-auto py-16">
        <article className="prose dark:prose-invert">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 dark:text-white">Projects</h1>
          <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">Relevant projects:</p>
          <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-y-8 gap-x-8">
            {projects.map((project, index) => (
              <ProjectCard key={index} name={project.name} description={project.description} image={project.imgUrl} link={project.link} />
            ))}
          </div>
        </article>
      </main>
    </div>
  )
}