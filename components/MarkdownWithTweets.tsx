import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import TweetEmbed from "./TweetEmbed";
import ImageGallery from "./ImageGallery";

interface MarkdownWithTweetsProps {
  content: string;
}

export default function MarkdownWithTweets({ content }: MarkdownWithTweetsProps) {
  const parts = content.split(/(\{\{tweet:\d+\}\}|\{\{gallery:[^\}]+\}\})/);

  return (
    <>
      {parts.map((part, index) => {
        const tweetMatch = part.match(/\{\{tweet:(\d+)\}\}/);
        if (tweetMatch) {
          return <TweetEmbed key={index} tweetId={tweetMatch[1]} />;
        }

        const galleryMatch = part.match(/\{\{gallery:([^\}]+)\}\}/);
        if (galleryMatch) {
          const images = galleryMatch[1].split(',').map(img => img.trim());
          return <ImageGallery key={index} images={images} />;
        }

        return (
          <ReactMarkdown
            key={index}
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ children }) => (
                <h1 className="text-4xl font-bold text-white mb-6">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-2xl font-bold text-white mt-8 mb-4 pb-2 border-b border-gray-700">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-xl font-semibold text-gray-200 mt-6 mb-3">
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <p className="text-gray-300 leading-relaxed mb-4">
                  {children}
                </p>
              ),
              ul: ({ children }) => (
                <ul className="list-disc list-inside space-y-2 mb-4 text-gray-300">
                  {children}
                </ul>
              ),
              li: ({ children }) => (
                <li className="leading-relaxed">{children}</li>
              ),
              strong: ({ children }) => (
                <strong className="font-semibold text-blue-400">
                  {children}
                </strong>
              ),
              code: ({ children }) => (
                <code className="bg-purple-900/50 text-purple-300 px-2 py-1 rounded text-sm font-mono">
                  {children}
                </code>
              ),
              img: ({ src, alt }) => (
                <img src={src} alt={alt} className="h-auto w-full" />
              ),
              hr: () => <hr className="my-8 border-t border-gray-700" />,
            }}
          >
            {part}
          </ReactMarkdown>
        );
      })}
    </>
  );
}
