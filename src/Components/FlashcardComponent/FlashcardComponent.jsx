import axios from "axios";
import React, { useState } from "react";

const FlashcardComponent = ({ flashcard }) => {
  const [showModal, setShowModal] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [showAnswer, setShowAnswer] = useState(false);
  const [answerVisible, setAnswerVisible] = useState(false);

  const handleAnswerSubmit = async () => {
    setErrorMessage('')
    try {
      if (flashcard.answer === userAnswer) {
        const res = true;
        const response = await axios.post(
          `https://alfredtask-be.onrender.com/api/v1/leitner/flashcards/${flashcard._id}`,
          { res },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.data.errorMessage) {
          setErrorMessage(response.data.errorMessage);
        } else {
          alert(
            "Answer submitted successfully! The flashcard will now move to the next box."
          );
          setShowModal(false);
          setUserAnswer("");
        }
      } else {
        const res = false;
        const response = await axios.post(
          `https://alfred-task-be.vercel.app/api/v1/leitner/flashcards/${flashcard._id}`,
          { res },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        alert("Answer is wrong The flashcard will now move to the 1st box.");
        setShowAnswer(true);
        setUserAnswer("");
      }
    } catch (error) {
      setErrorMessage("Failed to submit the answer. Please try again later.");
    }
  };

  const CancelHandler = () => {
    setShowModal(false);
    setAnswerVisible(false);
    setShowAnswer(false);
    setErrorMessage('')
    setUserAnswer('')
  };

  return (
    <React.Fragment>
      <div className="p-4 bg-white rounded-lg shadow-lg w-64 h-40 flex flex-col justify-between hover:">
        <h3 className="text-lg font-bold">{flashcard.question}</h3>

        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => setShowModal(true)}
        >
          Answer
        </button>

        {/* Modal for entering the answer */}
        {showModal && (
          <div className="fixed inset-0 backdrop-blur-sm bg-white/30 border border-white/30 rounded-lg shadow-lg flex items-center justify-center p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-auto">
              <button onClick={CancelHandler} className="w-8 relative left-90">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 6L6 18M6 6L18 18"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <h3 className="text-lg font-bold mb-4 text-center">
                Enter Your Answer
              </h3>
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mb-4 focus:ring focus:border-blue-500"
                placeholder="Type your answer"
              />
              {answerVisible && (
                <div className="bg-slate-200 px-6 py-2">
                  Answer: {flashcard.answer}
                </div>
              )}
              {errorMessage && (
                <p className="text-red-500 text-center mb-2">{errorMessage}</p>
              )}
              <div className="flex justify-end space-x-4 mt-4">
                {showAnswer && (
                  <button
                    onClick={() => setAnswerVisible(true)}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                  >
                    Show Answer
                  </button>
                )}
                <button
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
                  onClick={CancelHandler}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                  onClick={handleAnswerSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default FlashcardComponent;
