import React, { useState } from "react";
import { Boilerplate } from "..";
import { CategoryAccordion } from "../../components";
import { Factory,FAQ,Inception,MissionVission,Catalogue} from ".";
function About() {
  
  const [activeCategory, setActiveCategory] = useState('Inception');
  const categories = ['Inception','Mission & Vission','Factory','Catalogue','FAQ'];
  return (
    <Boilerplate height={'300px'} bgImage={'bg-about-texture'}>
      <div className="flex gap-5 flex-col md:flex-row">
        <div className="md:w-1/3  p-5">
          <CategoryAccordion  setActiveSection={setActiveCategory} categories={categories}/>
        </div>
        <div className="md:w-2/3  p-5 min-h-96">
        {
          activeCategory === 'Inception' && <Inception />
        }
        {
          activeCategory === 'Mission & Vission' && <MissionVission />
        }
        {
          activeCategory === 'Factory' && <Factory />
        }
        {
          activeCategory === 'FAQ' && <FAQ />
        }
        {
          activeCategory === 'Catalogue' && <Catalogue />
        }
           
        </div>
      </div>
    </Boilerplate>
  );
}   

export default About;
