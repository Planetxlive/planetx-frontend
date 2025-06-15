"use client";
import { useInView } from "@/hooks/use-in-view";
import BACKEND_URL from "@/lib/BACKEND_URL";
import axios from "axios";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import Image from "next/image";
import { Loader2, Tag } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { Skeleton } from "./ui/skeleton";
import { useRouter } from "next/navigation";

export default function BlogList() {
  const [loading, setLoading] = useState(false);
  const [hasNext, setHasNext] = useState(true);
  const { ref, inView } = useInView({
    threshold: 0.5,
    rootMargin: "0px 0px 200px 0px",
  });
  const router = useRouter();
  const [page, setPage] = useState(1);
  const post = useRef([]);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken")?.replace(/^"|"$/g, "");
    setToken(accessToken);
    if (!accessToken) {
      router.push("/login");
    }
  }, [router]);

  const fetchPostdata = async () => {
    if (loading || !hasNext || !inView || !token) return;
    setLoading(true);
    try {
      const data = await axios.get(`${BACKEND_URL}/blogs/get`, {
        params: {
          page: page,
          limit: 6,
        },
        headers: {
          Authorization: token,
        },
      });
      post.current = [...post.current, ...data.data.blogs];
      setHasNext(data.data.hasNextPage);
      setPage((prev) => prev + 1);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPostdata();
  }, [loading, page, inView]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {post.current.map((val, ind) => (
          <PostComponent key={ind} post={val} />
        ))}
      </div>

      {hasNext && (
        <div>
          {loading && <PostListSkeleton />}
          <div ref={ref} className="flex justify-center py-8">
            {loading && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Loading more posts...</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function PostListSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array(6)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="flex flex-col space-y-3">
            <Skeleton className="h-[200px] w-full rounded-lg" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <div className="flex justify-between">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-4 w-1/4" />
            </div>
          </div>
        ))}
    </div>
  );
}

function PostComponent({ post }) {
  return (
    <Link href={`/blog/${post._id}`} className="group">
      <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-card flex flex-col">
        <CardHeader className="p-0">
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={false}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/80 to-transparent p-4">
              <span className="inline-flex items-center rounded-full bg-violet-600 px-3 py-1 text-sm font-medium text-white shadow-sm transition-all hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500/50">
                <Tag className="mr-1.5 h-4 w-4" aria-hidden="true" />
                {post.category}
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-5 flex-grow">
          <h3 className="mb-2 line-clamp-2 text-xl font-bold text-foreground tracking-tight">
            {post.title}
          </h3>
          <p className="line-clamp-3 text-sm text-muted-foreground leading-relaxed">
            {post.description}
          </p>
        </CardContent>
        <CardFooter className="flex justify-between border-t border-border/50 p-4 text-xs text-muted-foreground mt-auto">
          <div className="flex items-center">
            {formatDate(post.createdAt)}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}