import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { sanityClient, urlFor } from '../sanity';
import { PortableText } from '@portabletext/react';
import { Calendar, User, ArrowLeft, ChevronRight, Loader2, BookOpen } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

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
    <section id="blog" className="relative py-24 bg-background z-10 overflow-hidden border-t border-white/5">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-2xl mb-6 border border-primary/20 shadow-[inset_0_0_10px_rgba(var(--primary),0.1)]">
            <BookOpen className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-display font-bold text-foreground mb-4">
            Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#00d2ff]">Blog</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg font-light">
            Thoughts, tutorials, and insights on web development and software engineering.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!selectedPost ? (
            <motion.div
              key="post-list"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20, filter: 'blur(5px)' }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {posts.length === 0 ? (
                <div className="col-span-full text-center text-muted-foreground py-12">
                  No blog posts available yet. Check back later!
                </div>
              ) : (
                posts.map((post, index) => (
                  <motion.div
                    key={post._id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => setSelectedPost(post)}
                    className="h-full"
                  >
                    <Card className="h-full bg-card/60 backdrop-blur-xl border-white/5 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:border-primary/30 hover:shadow-[0_15px_40px_-10px_rgba(var(--primary),0.2)] hover:-translate-y-1 transition-all duration-500 overflow-hidden group cursor-pointer flex flex-col">
                      <div className="aspect-video overflow-hidden relative bg-muted/20">
                        {post.mainImage && (
                          <img
                            src={urlFor(post.mainImage).width(600).height(400).url()}
                            alt={post.title}
                            className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700 ease-out"
                            loading="lazy"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-60" />
                      </div>
                      <CardContent className="p-6 flex flex-col flex-grow">
                        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                          {post.publishedAt && (
                            <div className="flex items-center gap-1.5 font-mono">
                              <Calendar size={14} />
                              {new Date(post.publishedAt).toLocaleDateString()}
                            </div>
                          )}
                          {post.author && (
                            <div className="flex items-center gap-1.5 font-mono">
                              <User size={14} />
                              {post.author}
                            </div>
                          )}
                        </div>
                        <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-muted-foreground text-sm line-clamp-3 mb-6 font-light flex-grow">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center text-primary text-sm font-semibold tracking-wide">
                          Read more
                          <ChevronRight size={16} className="ml-1 group-hover:translate-x-1.5 transition-transform duration-300" />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              )}
            </motion.div>
          ) : (
            <motion.div
              key="post-detail"
              initial={{ opacity: 0, x: 20, filter: 'blur(5px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-4xl mx-auto"
            >
              <Button
                variant="ghost"
                onClick={() => setSelectedPost(null)}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors mb-8 group/back px-4 py-2 rounded-full"
              >
                <ArrowLeft size={18} className="group-hover/back:-translate-x-1 transition-transform" />
                Back to articles
              </Button>
              
              <Card className="bg-card/40 backdrop-blur-2xl border-white/5 shadow-2xl overflow-hidden rounded-[2rem]">
                {selectedPost.mainImage && (
                  <div className="w-full aspect-video relative bg-muted/20">
                    <img
                      src={urlFor(selectedPost.mainImage).width(1200).height(675).url()}
                      alt={selectedPost.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
                  </div>
                )}
                
                <CardContent className="p-8 md:p-12 relative -mt-24 z-10">
                  <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6 font-mono bg-background/50 backdrop-blur-md w-fit px-4 py-2 rounded-full border border-white/10">
                    {selectedPost.publishedAt && (
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-primary" />
                        {new Date(selectedPost.publishedAt).toLocaleDateString()}
                      </div>
                    )}
                    {selectedPost.author && (
                      <div className="flex items-center gap-2">
                        <User size={16} className="text-primary" />
                        {selectedPost.author}
                      </div>
                    )}
                  </div>
                  
                  <h1 className="text-4xl md:text-5xl font-extrabold mb-10 tracking-tight text-foreground">{selectedPost.title}</h1>
                  
                  <div className="prose prose-invert prose-lg max-w-none prose-p:text-muted-foreground prose-p:font-light prose-p:leading-relaxed prose-headings:text-foreground prose-headings:font-bold prose-a:text-primary prose-img:rounded-2xl prose-img:border prose-img:border-white/10">
                    {selectedPost.body ? (
                      <PortableText 
                        value={selectedPost.body}
                        components={{
                          types: {
                            image: ({value}) => {
                              if (!value?.asset?._ref) return null;
                              return (
                                <img
                                  alt={value.alt || ' '}
                                  loading="lazy"
                                  src={urlFor(value).width(800).fit('max').auto('format').url()}
                                  className="rounded-[2rem] my-10 shadow-xl"
                                />
                              );
                            }
                          }
                        }}
                      />
                    ) : (
                      <p className="text-muted-foreground">No content available.</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
