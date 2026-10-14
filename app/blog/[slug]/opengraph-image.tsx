import { getPostBySlug, posts } from "@/data/posts";
import { renderOgImage, ogSize } from "@/lib/og";

export const runtime = "nodejs";
export const alt = "Artículo del blog | CuidaTuMascota.es";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const seasonal = slug.startsWith("black-friday") || slug.startsWith("regalos");
  return renderOgImage({
    title: post?.title ?? "Blog de CuidaTuMascota.es",
    kicker: seasonal ? "Guía de temporada" : post?.category ?? "Blog",
    photo: post?.image,
  });
}
