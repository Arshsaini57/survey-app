// import React, { useState } from 'react';
// import './Surveys.css';

// const Surveys = () => {
//   const [questions, setQuestions] = useState([]);
//   const [currentQuestion, setCurrentQuestion] = useState('');
//   const [currentOptions, setCurrentOptions] = useState(['']);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editingIndex, setEditingIndex] = useState(null);

//   const addOption = () => setCurrentOptions([...currentOptions, '']);

//   const updateOption = (index, value) => {
//     const updatedOptions = [...currentOptions];
//     updatedOptions[index] = value;
//     setCurrentOptions(updatedOptions);
//   };

//   const saveQuestion = () => {
//     if (!currentQuestion.trim()) return alert('Please enter a question.');

//     if (isEditing) {
//       const updatedQuestions = [...questions];
//       updatedQuestions[editingIndex] = { question: currentQuestion, options: currentOptions };
//       setQuestions(updatedQuestions);
//       setIsEditing(false);
//     } else {
//       setQuestions([...questions, { question: currentQuestion, options: currentOptions }]);
//     }

//     resetForm();
//   };

//   const resetForm = () => {
//     setCurrentQuestion('');
//     setCurrentOptions(['']);
//     setEditingIndex(null);
//   };

//   const editQuestion = (index) => {
//     setIsEditing(true);
//     setEditingIndex(index);
//     setCurrentQuestion(questions[index].question);
//     setCurrentOptions(questions[index].options);
//   };

//   const deleteQuestion = (index) => {
//     setQuestions(questions.filter((_, i) => i !== index));
//   };

//   return (
//     <div className="survey-container">
//       {/* Aside Navigation */}
//       <aside className="survey-aside">
//         <h2 className="aside-title">Quick Links</h2>
//         <ul className="aside-menu">
//           <li>Create Survey</li>
//           <li>Saved Surveys</li>
//           <li>Help</li>
//         </ul>
//       </aside>

//       {/* Main Workspace */}
//       <main className="survey-main">
//         <h1 className="main-title">Create Your Survey</h1>
//         <div className="question-form">
//           <input
//             type="text"
//             value={currentQuestion}
//             onChange={(e) => setCurrentQuestion(e.target.value)}
//             placeholder="Enter your question here..."
//             className="question-input"
//           />
//           <div className="options-section">
//             {currentOptions.map((option, index) => (
//               <input
//                 key={index}
//                 type="text"
//                 value={option}
//                 onChange={(e) => updateOption(index, e.target.value)}
//                 placeholder={`Option ${index + 1}`}
//                 className="option-input"
//               />
//             ))}
//             <button className="add-option-btn" onClick={addOption}>
//               + Add Option
//             </button>
//           </div>
//           <button className="save-btn" onClick={saveQuestion}>
//             {isEditing ? 'Update Question' : 'Save Question'}
//           </button>
//         </div>
//       </main>

//       {/* History Panel */}
//       <section className="survey-history">
//         <h2 className="history-title">Question History</h2>
//         <ul className="history-list">
//           {questions.length === 0 ? (
//             <p className="no-history">No questions created yet!</p>
//           ) : (
//             questions.map((item, index) => (
//               <li key={index} className="history-item">
//                 <div className="history-question">
//                   <p>{item.question}</p>
//                   <ul className="history-options">
//                     {item.options.map((option, idx) => (
//                       <li key={idx} className="option-item">
//                         {option}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//                 <div className="history-actions">
//                   <button className="edit-btn" onClick={() => editQuestion(index)}>
//                     ✏️ Edit
//                   </button>
//                   <button className="delete-btn" onClick={() => deleteQuestion(index)}>
//                     🗑️ Delete
//                   </button>
//                 </div>
//               </li>
//             ))
//           )}
//         </ul>
//       </section>
//     </div>
//   );
// };

// export default Surveys;

import React, { useState } from 'react';
import jsPDF from 'jspdf';
import './Surveys.css';

const Surveys = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [currentOptions, setCurrentOptions] = useState(['']);
  const [isMultipleChoice, setIsMultipleChoice] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const addOption = () => setCurrentOptions([...currentOptions, '']);

  const updateOption = (index, value) => {
    const updatedOptions = [...currentOptions];
    updatedOptions[index] = value;
    setCurrentOptions(updatedOptions);
  };

  const saveQuestion = () => {
    if (!currentQuestion.trim()) return alert('Please enter a question.');

    const newQuestion = {
      question: currentQuestion,
      options: currentOptions,
      type: isMultipleChoice ? 'multiple-choice' : 'single-choice',
    };

    if (isEditing) {
      const updatedQuestions = [...questions];
      updatedQuestions[editingIndex] = newQuestion;
      setQuestions(updatedQuestions);
      setIsEditing(false);
    } else {
      setQuestions([...questions, newQuestion]);
    }

    resetForm();
  };

  const resetForm = () => {
    setCurrentQuestion('');
    setCurrentOptions(['']);
    setIsMultipleChoice(false);
    setEditingIndex(null);
  };

  const downloadSurvey = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Survey Questions', 10, 10);
    let yPosition = 20;

    questions.forEach((q, index) => {
      doc.text(`${index + 1}. ${q.question}`, 10, yPosition); // Backticks for template literals
      yPosition += 10;
    
      q.options.forEach((option) => {
        doc.text(`- ${option}`, 20, yPosition); // Backticks for template literals
        yPosition += 10;
      });
    
      yPosition += 5; // Extra spacing between questions
    });
    
    doc.save('Survey.pdf');
  };

  return (
    <div className="survey-container">
      {/* Sidebar */}
      <aside className="survey-aside">
        <h2 className="aside-title">Quick Links</h2>
        <ul className="aside-menu">
          <li>Create Survey</li>
          <li onClick={downloadSurvey}>Download Survey</li>
          <li>Help</li>
        </ul>
      </aside>

      {/* Main Workspace */}
      <main className="survey-main">
        <h1 className="main-title">Create Your Survey</h1>
        <div className="question-form">
          <input
            type="text"
            value={currentQuestion}
            onChange={(e) => setCurrentQuestion(e.target.value)}
            placeholder="Enter your question here..."
            className="question-input"
          />
          <div className="options-section">
            {currentOptions.map((option, index) => (
              <input
                key={index}
                type="text"
                value={option}
                onChange={(e) => updateOption(index, e.target.value)}
                placeholder={`Option ${index + 1}`}
                className="option-input"
              />
            ))}
            <div>
              <button className="add-option-btn" onClick={addOption}>
                + Add Option
              </button>
            </div>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={isMultipleChoice}
                onChange={(e) => setIsMultipleChoice(e.target.checked)}
              />
              Multiple Choice
            </label>
          </div>
          <button className="save-btn" onClick={saveQuestion}>
            {isEditing ? 'Update Question' : 'Save Question'}
          </button>
        </div>
      </main>

      {/* History Panel */}
      <section className="survey-history">
        <h2 className="history-title">Question History</h2>
        <ul className="history-list">
          {questions.length === 0 ? (
            <p className="no-history">No questions created yet!</p>
          ) : (
            questions.map((item, index) => (
              <li key={index} className="history-item">
                <div className="history-question">
                  <p>{item.question}</p>
                  <ul className="history-options">
                    {item.options.map((option, idx) => (
                      <li key={idx} className="option-item">
                        {option}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))
          )}
        </ul>
      </section>
    </div>
  );
};

export default Surveys;