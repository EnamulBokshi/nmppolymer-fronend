import React, { useState } from "react";
import { Boilerplate } from "..";
import { CategoryAccordion } from "../../components";
function About() {
  const [activeCategory, setActiveCategory] = useState('inception');

  return (
    <Boilerplate>
      <div className="flex gap-5 flex-nowrap">
        <div className="w-1/3  p-5">
          <CategoryAccordion  setActiveSection={setActiveCategory} categories={['Inception','Mission & Vission', 'Factory','FAQ','Catalogue']}/>
        </div>
        <div className="w-2/3  p-5 min-h-96">
          <h1 className="text-3xl font-bold text-red-900">{activeCategory.toUpperCase()}</h1>
          <p className="text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit </p>   
        </div>
      </div>
    </Boilerplate>
  );
}   

export default About;


function Inception () {
  return (
    <div>
      <h1>Inception</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatem.</p>
    </div>
  )
}