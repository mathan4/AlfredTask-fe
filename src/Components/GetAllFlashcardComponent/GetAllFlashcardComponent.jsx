import axios from "axios";
import React, { useEffect, useState } from "react";
import FlashcardComponent from "../FlashcardComponent/FlashcardComponent";

const GetAllFlashcardComponent = () => {
    const [FlashCard, setFlashCard] = useState([]);

    const getAllFlashcardsComponent = async () => {
      const response = await axios.get(
        "https://alfredtask-be.onrender.com/api/v1/leitner/flashcards"
      );
      await setFlashCard(response.data);
      
    };
  
    useEffect(() => {
      getAllFlashcardsComponent();
    }, []);

    const deleteHandler=async(id)=>{
        try {
            const del= await axios.delete(`https://alfred-task-be.vercel.app/flashcards/${id}`)
            alert('successfully deleted')
            getAllFlashcardsComponent()
        } catch (error) {
            alert(`${error.message}`)
            console.log(error.message)
        }

    }
    return (
      <React.Fragment>
        <div className=" py-10 px-8">
          {
            FlashCard.length > 0 ? (
              <div className="space-y-4 flex gap-4 flex-wrap mt-10">
                {FlashCard.map((flashcard, index) => (
                  <div key={index}  >
                    <button onClick={()=>deleteHandler(flashcard._id)} className="bg-red-500 text-white px-2 rounded-lg py-1 hover:bg-red-600">Delete</button>
                    <FlashcardComponent flashcard={flashcard} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-600">
                No flashcards available.
              </div>
            )
        }
        </div>
      </React.Fragment>
    );
}

export default GetAllFlashcardComponent
