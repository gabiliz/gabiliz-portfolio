import { ArrowUpRightIcon } from '@heroicons/react/24/outline'

export default function More() {
  return (
    <div className="relative flex sm:items-start items-center h-full flex-col px-4 pt-14 sm:px-6 lg:px-8">
      <main className="flex-auto py-16 max-w-xs sm:max-w-md">
        <article className="prose dark:prose-invert">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 dark:text-white">Wanna know more about me?</h1>
          <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">Here are some things you can stalk:</p>
            <ul role="list" className="divide-y divide-violet-200 dark:divide-violet-600/20">
              <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Letterboxd
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      I don&apos;t consider myself a cinephile but I always try to give my honest opinion on the movies I watch.
                    </p>
                  </div>
                  <a href="https://letterboxd.com/gabiliz/" target="_blank" className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    <ArrowUpRightIcon width={15} height={15} />
                  </a>
                </div>
              </li>
              <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Last.fm
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      You can see what I usually listen to (trust me, good stuff). If you liked the songs you can follow me <a className="text-violet-500" href="https://open.spotify.com/user/gabys1502?si=3df335feafed455a" target="_blank">here</a> too!
                    </p>
                  </div>
                  <a href="https://www.last.fm/pt/user/gabiliz_m" target="_blank" className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    <ArrowUpRightIcon width={15} height={15} />
                  </a>
                </div>
              </li>
              <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      TV Time
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      I don&apos;t usually watch tons of shows so if I&apos;m watching one, it&apos;s probably because I was forced into or it really caught my attention.
                    </p>
                  </div>
                  <a href="https://www.tvtime.com/en/gabiliz" target="_blank" className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    <ArrowUpRightIcon width={15} height={15} />
                  </a>
                </div>
              </li>
              <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      MyAnimeList
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      yes... I do watch anime, but at least are not the weird ones.
                    </p>
                  </div>
                  <a href="https://myanimelist.net/animelist/gabiliz" target="_blank" className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    <ArrowUpRightIcon width={15} height={15} />
                  </a>
                </div>
              </li>
              <li className="pt-3 pb-0 sm:pt-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Goodreads
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      I know I don&apos;t read much but I promise I&apos;m trying to.
                    </p>
                  </div>
                  <a href="https://www.goodreads.com/user/show/151685997-gabriela-liz" target="_blank" className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    <ArrowUpRightIcon width={15} height={15} />
                  </a>
                </div>
              </li>
            </ul>
        </article>
      </main>
    </div>
  )
}