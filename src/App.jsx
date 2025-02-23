import React from "react";
import GetAllDueFlashcardsComponent from "./Components/GetAllDueFlashcardsComponent/GetAllDueFlashcardsComponent";
import AddNewFlashcardComponent from "./Components/AddNewFlashcardComponent/AddNewFlashcardComponent";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import GetAllFlashcardComponent from "./Components/GetAllFlashcardComponent/GetAllFlashcardComponent";
import logo from './assets/logo.png'

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
       
        <nav className="bg-gray-900 text-white px-6 py-4">
          <div className="container mx-auto flex items-center justify-between  sm:flex-row flex-col gap-4">
         
            <div className="flex items-center">
              <Link to="/" className="text-xl font-semibold flex items-center gap-2">
                <img className="bg-white rounded-3xl" src={logo}/>
                Leitner System
              </Link>
            </div>

           
            <div className="flex items-center space-x-6">
              <Link
                to="/"
                className="hover:text-gray-300 transition duration-150"
              >
                Home
              </Link>
              <Link
                to="/add"
                className="hover:text-gray-300 transition duration-150"
              >
                Add Flashcard
              </Link>
              <Link
                to="/all"
                className="hover:text-gray-300 transition duration-150"
              >
                All FlashCards
              </Link>
            </div>
          </div>
        </nav>

      
          <Routes>
            <Route exact path="/" element={<GetAllDueFlashcardsComponent />} />
            <Route path="/add" element={<AddNewFlashcardComponent />} />
            <Route path="/all" element={<GetAllFlashcardComponent />} />
          </Routes>
        
      </div>
    </BrowserRouter>
  );
};

export default App;
