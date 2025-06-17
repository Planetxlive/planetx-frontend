import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function BlogHero() {
  return (
    <div className="relative min-h-[500px] overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src="/bg-blog.png"
          alt="Real Estate Community"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative container px-4 py-20 md:py-32">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-white md:text-6xl lg:text-7xl">
            Real Estate Community Blog
          </h1>
          <p className="mx-auto mb-10 text-xl text-gray-200 md:text-2xl">
            Find roommates, discover properties, and stay updated with the latest community news
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/blog/new">
              <Button variant="secondary" size="lg" className="bg-white text-black hover:bg-gray-100">
                Post a Listing
              </Button>
            </Link>
            <Link href="/blog?category=Roommate+Wanted">
              {/* <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                Find a Roommate
              </Button> */}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
