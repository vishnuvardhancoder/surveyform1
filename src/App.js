import React, { useState } from 'react';
import './App.css';
import QuestionList from './components/QuestionList';
import axios from 'axios';

const questions = [
  'What is your favorite color?',
  'How often do you exercise?',
  'What is your favorite programming language?',
  'Do you prefer cats or dogs?',
  'What is your preferred method of transportation?',
  'How many hours of sleep do you get per night?',
];

const App = () => {
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const handleQuestionToggle = (question) => {
    if (selectedQuestions.includes(question)) {
      setSelectedQuestions(selectedQuestions.filter((q) => q !== question));
      setAnswers({ ...answers, [question]: '' });
    } else {
      setSelectedQuestions([...selectedQuestions, question]);
    }
  };

  const handleAnswerChange = (question, answer) => {
    setAnswers({ ...answers, [question]: answer });
  };

  const handleFormSubmit = async () => {
    if (selectedQuestions.length === 5) {
      try {
        const response = await axios.post('http://localhost:5000/api/survey', {
          questions: selectedQuestions,
          answers,
        });

        if (response.status === 201) {
          console.log('Survey data submitted successfully!');
          // Set the submission status to display a success message
          setSubmissionStatus('success');
          // Reset the form state
          setSelectedQuestions([]);
          setAnswers({});
          // Reset submission status after a delay
          setTimeout(() => {
            setSubmissionStatus(null);
          }, 3000);
        } else {
          console.error('Failed to submit survey data');
          // Set the submission status to display an error message
          setSubmissionStatus('error');
        }
      } catch (error) {
        console.error(error);
        setSubmissionStatus('error');
      }
    } else {
      setSubmissionStatus('error');
    }
  };

  return (
    <div className="App">
      <h1 className="name">Survey App</h1>
      <p>Select any 5 questions to answer:</p>
      <QuestionList
        questions={questions}
        selectedQuestions={selectedQuestions}
        onToggle={handleQuestionToggle}
        onAnswerChange={handleAnswerChange}
        answers={answers}
      />
      <div className="button-container">
        <button className="submit-button" onClick={handleFormSubmit}>
          Submit
        </button>
        <button
          className="reset-button"
          onClick={() => {
            setSelectedQuestions([]);
            setAnswers({});
            setSubmissionStatus(null);
          }}
        >
          Reset
        </button>
      </div>
      {submissionStatus === 'success' && (
        <div className="success-message">Survey form submitted successfully!</div>
      )}
      {submissionStatus === 'error' && (
        <div className="error-message">
          Please answer exactly 5 questions before submitting the form.
        </div>
      )}
    </div>
  );
};

export default App;
