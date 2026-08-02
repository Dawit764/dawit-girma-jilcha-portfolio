import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { sanityClient, urlFor } from '../sanity';
import { PortableText } from '@portabletext/react';
import { Calendar, User, ArrowLeft, ChevronRight, Loader2, BookOpen } from 'lucide-react';

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage: any;
  publishedAt: string;
  excerpt: string;
  author: string;
  categories: string[];
  body: any;
}

export default function Blog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "post"] | order(publishedAt desc) {
          _id,
          title,
          slug,
          mainImage,
          publishedAt,
          excerpt,
          author,
          "categories": categories[]->title,
          body
        }`
      )
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <section id="blog" className="relative py-24 bg-[var(--color-background)] z-10 overflow-hidden border-t border-[var(--color-primary)]/10">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-[500px] bg-[var(--color-primary)]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center p-3 bg-[var(--color-primary)]/10 rounded-2xl mb-6 border border-[var(--color-primary)]/20">
            <BookOpen className="w-8 h-8 text-[var(--color-primary)]" />
          </div>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-display font-bold text-white mb-4">
            Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)]">Blog</span>
          </h2>
          <p className="text-[var(--color-text-muted)] max-w-2xl mx-auto text-lg">
            Thoughts, tutorials, and insights on web development and software engineering.
          </p>
        </motion.div>

      <AnimatePresence mode="wait">
        {!selectedPost ? (
          <motion.div
            key="post-list"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {posts.length === 0 ? (
              <div className="col-span-full text-center text-gray-400 py-12">
                No blog posts available yet. Check back later!
              </div>
            ) : (
              posts.map((post, index) => (
                <motion.div
                  key={post._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card rounded-2xl overflow-hidden border border-border/50 hover:border-primary/50 transition-colors group cursor-pointer"
                  onClick={() => setSelectedPost(post)}
                >
                  <div className="aspect-video overflow-hidden relative bg-muted">
                    {post.mainImage && (
                      <img
                        src={urlFor(post.mainImage).width(600).height(400).url()}
                        alt={post.title}
                        className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                      {post.publishedAt && (
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          {new Date(post.publishedAt).toLocaleDateString()}
                        </div>
                      )}
                      {post.author && (
                        <div className="flex items-center gap-1">
                          <User size={14} />
                          {post.author}
                        </div>
                      )}
                    </div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-400 text-sm line-clamp-3 mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center text-primary text-sm font-medium">
                      Read more
                      <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        ) : (
          <motion.div
            key="post-detail"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="max-w-4xl mx-auto"
          >
            <button
              onClick={() => setSelectedPost(null)}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group"
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              Back to articles
            </button>
            
            {selectedPost.mainImage && (
              <div className="w-full aspect-video rounded-2xl overflow-hidden mb-8 bg-muted">
                <img
                  src={urlFor(selectedPost.mainImage).width(1200).height(675).url()}
                  alt={selectedPost.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <div className="flex items-center gap-6 text-sm text-gray-400 mb-6 border-b border-border/50 pb-6">
              {selectedPost.publishedAt && (
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  {new Date(selectedPost.publishedAt).toLocaleDateString()}
                </div>
              )}
              {selectedPost.author && (
                <div className="flex items-center gap-2">
                  <User size={16} />
                  {selectedPost.author}
                </div>
              )}
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-8">{selectedPost.title}</h1>
            
            <div className="prose prose-invert prose-lg max-w-none">
              {selectedPost.body ? (
                <PortableText 
                  value={selectedPost.body}
                  components={{
                    types: {
                      image: ({value}) => {
                        if (!value?.asset?._ref) {
                          return null
                        }
                        return (
                          <img
                            alt={value.alt || ' '}
                            loading="lazy"
                            src={urlFor(value).width(800).fit('max').auto('format').url()}
                            className="rounded-xl my-8"
                          />
                        )
                      }
                    }
                  }}
                />
              ) : (
                <p className="text-gray-400">No content available.</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </section>
  );
}
