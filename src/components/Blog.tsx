import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { sanityClient, urlFor } from '../sanity';
import { PortableText } from '@portabletext/react';
import { Calendar, User, ArrowLeft, ChevronRight, Loader2, BookOpen } from 'lucide-react';
import Magnetic from './ui/Magnetic';
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
    <section id="blog" className="relative py-32 z-10">
      
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <div className="inline-block px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-primary/80 text-xs tracking-widest uppercase mb-6">
            Journal
          </div>
          <h2 className="text-4xl md:text-5xl font-display text-foreground">
            Field Notes
          </h2>
        </motion.div>

        <AnimatePresence mode="wait">
          {!selectedPost ? (
            <motion.div
              key="post-list"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, filter: 'blur(10px)' }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
            >
              {posts.length === 0 ? (
                <div className="col-span-full text-center text-muted-foreground/60 py-12 italic font-light">
                  The notebook is currently empty.
                </div>
              ) : (
                posts.map((post, index) => (
                  <motion.div
                    key={post._id}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => setSelectedPost(post)}
                    className="group cursor-pointer flex flex-col h-full bg-white/5 border border-white/10 backdrop-blur-md rounded-[2.5rem] overflow-hidden transition-all duration-700 hover:bg-white/10 hover:-translate-y-2"
                  >
                    <div className="aspect-[4/3] overflow-hidden relative">
                      {post.mainImage && (
                        <img
                          src={urlFor(post.mainImage).width(800).height(600).url()}
                          alt={post.title}
                          className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-1000 ease-out mix-blend-luminosity opacity-80 group-hover:mix-blend-normal group-hover:opacity-100"
                          loading="lazy"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                    
                    <div className="p-8 flex flex-col flex-grow">
                      <div className="flex items-center gap-4 text-xs text-muted-foreground/70 mb-4 font-mono tracking-wide">
                        {post.publishedAt && (
                          <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                        )}
                      </div>
                      <h3 className="text-2xl font-display text-foreground/90 mb-4 group-hover:text-primary transition-colors duration-500 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground/80 font-light text-base line-clamp-3 flex-grow mb-6">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center text-primary/80 text-sm italic font-light">
                        Read entry
                        <ChevronRight size={16} className="ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500" />
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </motion.div>
          ) : (
            <motion.div
              key="post-detail"
              initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -40, filter: 'blur(10px)' }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-3xl mx-auto"
            >
              <Magnetic>
                <Button
                  variant="ghost"
                  onClick={() => setSelectedPost(null)}
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors mb-12 rounded-full border border-white/10 px-6 py-6"
                >
                  <ArrowLeft size={18} />
                  Return to Notes
                </Button>
              </Magnetic>
              
              <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-[3rem] overflow-hidden p-8 md:p-16">
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground/70 mb-6 font-mono tracking-wide">
                  {selectedPost.publishedAt && (
                    <span>{new Date(selectedPost.publishedAt).toLocaleDateString()}</span>
                  )}
                  {selectedPost.author && (
                    <>
                      <span>&mdash;</span>
                      <span>{selectedPost.author}</span>
                    </>
                  )}
                </div>
                
                <h1 className="text-4xl md:text-5xl font-display mb-12 text-foreground/90">{selectedPost.title}</h1>
                
                {selectedPost.mainImage && (
                  <div className="w-full aspect-video relative rounded-2xl overflow-hidden mb-12 shadow-2xl">
                    <img
                      src={urlFor(selectedPost.mainImage).width(1200).height(675).url()}
                      alt={selectedPost.title}
                      className="w-full h-full object-cover mix-blend-luminosity hover:mix-blend-normal transition-all duration-1000"
                    />
                  </div>
                )}
                
                <div className="prose prose-invert prose-lg max-w-none 
                  prose-p:text-muted-foreground/80 prose-p:font-light prose-p:leading-[1.8] 
                  prose-headings:text-foreground/90 prose-headings:font-display prose-headings:font-normal
                  prose-a:text-primary prose-a:underline-offset-4
                  prose-img:rounded-2xl prose-img:border prose-img:border-white/10">
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
                                className="rounded-2xl my-10 shadow-2xl mix-blend-luminosity hover:mix-blend-normal transition-all duration-1000"
                              />
                            );
                          }
                        }
                      }}
                    />
                  ) : (
                    <p className="text-muted-foreground/60 italic">Note content is unavailable.</p>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
