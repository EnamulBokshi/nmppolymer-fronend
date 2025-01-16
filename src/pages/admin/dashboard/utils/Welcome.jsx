import React from 'react'
import { FaSearch } from "react-icons/fa";
import Typewriter from "typewriter-effect"
function Welcome() {
  const userName = 'Masuddur Rahman'
  return (
    <div className="">
            <div className="grid grid-cols-2 pb-5">
              <div className="pb-3">
                <h1 className="text-3xl font-semibold">Welcome,</h1>

                <div className="font-serif font-bold inline-block bg-transparent">
                 
                  <Typewriter
                onInit={(typewriter) => {
                    typewriter
                        .typeString("NMP Ploymer ")
                        .pauseFor(1000)
                        .deleteAll()
                        .typeString("Welcomes You")
                        
                        .start();
                 }}
                 options={{
                  strings: [userName,'Welcome to the dashboard'],
                  autoStart: true,
                  loop: true,
                  deleteSpeed: 50,
                  delay: 50,
              }}
                />
                </div>
              </div>
              {/* Search Box */}
              <div className="relative inline-block">
                <input
                  type="text"
                  className="px-8 py-2 rounded-lg"
                  placeholder="search..."
                />
                <FaSearch className="absolute top-3 left-2 text-gray-400" />
              </div>
            </div>
            <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-gray-200 py-8 rounded-lg"></div>
          </div>
  )
}

export default Welcome