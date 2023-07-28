export default function Home() {
  return (
    <div className="relative flex h-full flex-col px-4 pt-14 sm:px-6 lg:px-8">
      <main className="flex-auto py-16">
        <article className="prose dark:prose-invert lg:flex">
          <div className="lg:pr-32">
            <h1 className="text-2xl font-bold">Gabriela Liz</h1>
            <div className="flex items-center mb-1">
              <p className="text-violet-600 dark:text-violet-400">Front-end Developer</p>
              <p className="ml-5 inline-flex gap-0.5 justify-center overflow-hidden text-sm font-medium transition rounded-lg py-1 px-3 bg-violet-400/10 text-violet-400 dark:ring-1 ring-inset ring-violet-400/20 hover:bg-violet-400/10 hover:text-violet-300 hover:ring-violet-300">#OpenToWork</p>
            </div>
              <p className="text-zinc-600 dark:text-zinc-400 mb-24">I&apos;m a developer from <span className="text-violet-600 dark:text-violet-400">Brazil</span> who&apos;s experienced in building modern web applications. I currently work mostly with React, but I&apos;m always open to learn new technologies :)</p>
          </div>
          <div className="lg:pr-32">
            <p className="text-zinc-600 dark:text-zinc-400 mb-8">Back in the end of 2019, I started a HTML course, because I was on vacation and wanted to learn something new, tumbling head first into the rabbit hole of coding.</p>
            <p className="text-zinc-600 dark:text-zinc-400">My grandma was my main inspiration to start my bachelor of Software Engineering, when she heard that I was doing a HTML course, she immediately printed out some pages about different technologies courses for me, so I thought, why not?</p>
            <p className="text-zinc-600 dark:text-zinc-400 mb-8">Fast-foward to today, I&apos;ve already worked for <span className="text-violet-600 dark:text-violet-400">start-ups</span>, <span className="text-violet-600 dark:text-violet-400">fintechs</span>, <span className="text-violet-600 dark:text-violet-400">consultings</span> and a <span className="text-violet-600 dark:text-violet-400">SaaS</span> company.</p>
            <p className="text-zinc-600 dark:text-zinc-400">My main focus right now is to graduate and have the privilege of building software for a new company.</p>
            <p className="text-zinc-600 dark:text-zinc-400">When I&apos;m not working, I&apos;m usually playing with friends, walking with my dog, or watching Masterchef with my mom.</p>
          </div>
        </article>
      </main>
    </div>
  )
}
