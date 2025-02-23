import axios from "axios";
import React, { useEffect, useState } from "react";
import FlashcardComponent from "../FlashcardComponent/FlashcardComponent";

const GetAllDueFlashcardsComponent = () => {
  const [dueFlashCard, setDueFlashCard] = useState([]);

  const getAllDueFlashcardsComponent = async () => {
    const response = await axios.get(
      "https://alfred-task-be.vercel.app/flashcards"
    );
    await setDueFlashCard(response.data);
   
  };
  useEffect(() => {
    getAllDueFlashcardsComponent();
  }, []);
  return (
    <React.Fragment>
      <div>
        {dueFlashCard ? (
          dueFlashCard.length > 0 ? (
            <div className="space-y-4 flex gap-4 flex-wrap mt-10 ">
              {dueFlashCard.map((flashcard, index) => (
                <div key={index} className="hover:-translate-y-3 hover:-translate-x-1.5 transition" >
                  <FlashcardComponent flashcard={flashcard} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-600">
              No flashcards due at this time.
            </div>
          )
        ) : (
          <div className="text-center py-8">
            <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            Loading flashcards...
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default GetAllDueFlashcardsComponent;
