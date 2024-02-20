import React from 'react';
const QuestionItem = ({ question, isSelected, onToggle, onAnswerChange, answer }) => (
  <li className={isSelected ? 'selected' : ''}>
    <label>
      <input
        type="checkbox"
        checked={isSelected}
        onChange={() => onToggle(question)}
      />
      {question}
    </label>
    {isSelected && (
      <input
        type="text"
        placeholder="Your answer..."
        value={answer || ''}
        onChange={(e) => onAnswerChange(question, e.target.value)}
      />
    )}
  </li>
);
export default QuestionItem;