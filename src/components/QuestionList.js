import React from 'react';
import QuestionItem from './QuestionItem';
const QuestionList = ({ questions, selectedQuestions, onToggle, onAnswerChange, answers }) => (
  <ul>
    {questions.map((question, index) => (
      <QuestionItem
        key={index}
        question={question}
        isSelected={selectedQuestions.includes(question)}
        onToggle={onToggle}
        onAnswerChange={onAnswerChange}
        answer={answers[question] || ''}
      />
    ))}
  </ul>
);
export default QuestionList;