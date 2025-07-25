import { ArrowUpRightIcon } from '@heroicons/react/24/outline'
import Image from "next/image";

interface ProjectCardProps {
  name: string
  description: string
  image: string
  link: string
}

export default function ProjectCard({ name, description, image, link }: ProjectCardProps) {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-zinc-800/30 dark:border-zinc-700 flex flex-col">
      <div className="relative w-full h-48 overflow-hidden rounded-t-lg">
        <Image 
          fill 
          className="object-cover" 
          src={image} 
          alt="Project image" 
        />
      </div>
      <div className="p-5 flex-1">
        <a href={link} className='flex'>
          <h5 className="mb-2 text-2xl mr-2 font-bold tracking-tight text-gray-900 dark:text-white">{name}</h5>
          <ArrowUpRightIcon className='mt-2' width={15} height={15} />
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{description}</p>
      </div>
    </div>
  )
}