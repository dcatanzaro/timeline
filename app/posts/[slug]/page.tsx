import fs from "fs";
import path from "path";
import Link from "next/link";
import BackButton from "@/components/BackButton";
import MarkdownWithTweets from "@/components/MarkdownWithTweets";
import ImageGallery from "@/components/ImageGallery";
import TweetEmbed from "@/components/TweetEmbed";
import matter from "gray-matter";
import timelineData from "@/data/timeline.json";

export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), "posts");
  const filenames = fs.readdirSync(postsDirectory);

  return filenames.map((filename) => ({
    slug: filename.replace(/\.md$/, ""),
  }));
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const postsDirectory = path.join(process.cwd(), "posts");
  const fullPath = path.join(postsDirectory, `${slug}.md`);

  let content = "";
  let frontmatter: any = {};
  try {
    const fileContent = fs.readFileSync(fullPath, "utf8");
    const { data, content: markdownContent } = matter(fileContent);
    frontmatter = data;
    content = markdownContent;
  } catch (error) {
    console.error(`Error reading file ${fullPath}:`, error);

    return (
      <div className="min-h-screen py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
            <h1 className="text-3xl font-bold text-white mb-4">
              Post not found
            </h1>
            <Link href="/" className="text-blue-400 hover:text-blue-300">
              ← Volver
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const currentIndex = timelineData.findIndex((item) => item.slug === slug);
  const currentPost = timelineData[currentIndex];
  const previousPost = currentIndex > 0 ? timelineData[currentIndex - 1] : null;
  const nextPost =
    currentIndex < timelineData.length - 1
      ? timelineData[currentIndex + 1]
      : null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = date.toLocaleDateString("es-ES", { month: "long" });
    const year = date.getFullYear();
    return `${month.charAt(0).toUpperCase() + month.slice(1)} ${year}`;
  };

  const calculateAge = (dateString: string) => {
    const milestoneDate = new Date(dateString);
    const birthDate = new Date("1995-05-05");
    let age = milestoneDate.getFullYear() - birthDate.getFullYear();
    const monthDiff = milestoneDate.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && milestoneDate.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  return (
    <div className="min-h-screen to-gray-900 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <BackButton />

        {frontmatter.tweets && frontmatter.tweets.length > 0 && (
          <div className="mb-6">
            {frontmatter.tweets.map((tweetId: string) => (
              <TweetEmbed key={tweetId} tweetId={tweetId} />
            ))}
          </div>
        )}

        <article className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
          {currentPost && (
            <div className="text-sm text-blue-400 font-semibold mb-4">
              {formatDate(currentPost.date)} • {calculateAge(currentPost.date)}{" "}
              años
            </div>
          )}
          <div className="prose prose-slate prose-invert max-w-none">
            <MarkdownWithTweets content={content} />
          </div>

          {frontmatter.gallery && frontmatter.gallery.length > 0 && (
            <ImageGallery images={frontmatter.gallery} />
          )}
        </article>

        {(previousPost || nextPost) && (
          <div className="mt-8 flex justify-between gap-4">
            {previousPost && previousPost.slug && (
              <Link
                href={`/posts/${previousPost.slug}`}
                className="flex-1 bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:bg-gray-700/80 transition-colors text-left"
              >
                <div className="text-blue-400 text-sm mb-1">← Previous</div>
                <div className="text-white font-semibold">
                  {previousPost.title}
                </div>
              </Link>
            )}
            {nextPost && nextPost.slug && (
              <Link
                href={`/posts/${nextPost.slug}`}
                className="flex-1 bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:bg-gray-700/80 transition-colors text-right"
              >
                <div className="text-blue-400 text-sm mb-1">Next →</div>
                <div className="text-white font-semibold">{nextPost.title}</div>
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
