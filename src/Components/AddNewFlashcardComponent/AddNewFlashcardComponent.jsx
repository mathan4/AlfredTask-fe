import React, { useState } from 'react';
import axios from 'axios';

const AddNewFlashcardComponent = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const validateFields = () => {
    const questionRegex = /^[a-zA-Z0-9\s\.,!?]{5,}$/;
    const answerRegex = /^[a-zA-Z0-9\s]{2,}$/;

    if (!questionRegex.test(question)) {
      setErrorMessage('Invalid question. Must be at least 5 characters.');
      return false;
    }

    if (!answerRegex.test(answer)) {
      setErrorMessage('Invalid answer. Must be at least 2 characters.');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (validateFields()) {
      try {
        const response = await axios.post('https://alfred-task-be.vercel.app/api/v1/leitner/addflashcards', {
          question,
          answer,
          box: 1,  
          nextReviewDate: new Date(), 
        });

        setSuccessMessage('Flashcard added successfully!');
        setQuestion('');
        setAnswer('');
      } catch (error) {
        setErrorMessage('Error adding flashcard. Please try again later.');
      }
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">Add New Flashcard</h2>
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
      {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Question</label>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter the question"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Answer</label>
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter the answer"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
        >
          Add Flashcard
        </button>
      </form>
    </div>
  );
};

export default AddNewFlashcardComponent;
