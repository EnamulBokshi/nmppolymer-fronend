import React, { useState, useEffect } from "react";
import { Boilerplate } from "..";
import { CategoryAccordion } from "../../components";
import { Factory, FAQ, Inception, MissionVission, Catalogue } from ".";
import { motion, AnimatePresence } from "framer-motion";

function About() {
  const [activeCategory, setActiveCategory] = useState('Inception');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);
  
  const categories = [
    { id: 'inception', label: 'Inception', component: <Inception /> },
    { id: 'mission', label: 'Mission & Vision', component: <MissionVission /> },
    { id: 'factory', label: 'Factory', component: <Factory /> },
    { id: 'catalogue', label: 'Catalogue', component: <Catalogue /> },
    { id: 'faq', label: 'FAQ', component: <FAQ /> }
  ];

  // Animation variants
  const containerVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { duration: 0.5 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  const contentVariants = {
    initial: { x: 20, opacity: 0 },
    animate: { 
      x: 0, 
      opacity: 1,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: { 
      x: -20, 
      opacity: 0,
      transition: { 
        duration: 0.3
      }
    }
  };

  return (
    <Boilerplate height={'300px'} bgImage={'bg-about-texture'}>
      <motion.div 
        className="container mx-auto px-4 py-8"
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="md:w-1/3 bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-serif font-bold mb-6 text-gray-800 border-b pb-2">
              About Us
            </h2>
            <CategoryAccordion 
              setActiveSection={setActiveCategory} 
              categories={categories.map(cat => cat.label)}
              activeCategory={activeCategory}
            />
          </div>

          {/* Content Area */}
          <div className="md:w-2/3 bg-white rounded-lg shadow-lg p-6 min-h-[500px]">
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </motion.div>
              ) : (
                <motion.div
                  key={activeCategory}
                  variants={contentVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="h-full"
                >
                  {categories.find(cat => 
                    cat.label === activeCategory
                  )?.component}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </Boilerplate>
  );
}

export default About;
