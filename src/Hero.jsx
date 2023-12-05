import React, { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const Hero = () => {
  const [options, setOptions] = useState([
    { id: 'category1', content: 'Category1' },
    { id: 'Category2', content: 'Category2' },
  ]);

  const onDragEnd = (result) => {
    if (!result.destination) return; // If dropped outside the list

    const reorderedOptions = [...options];
    const [removed] = reorderedOptions.splice(result.source.index, 1);
    reorderedOptions.splice(result.destination.index, 0, removed);

    setOptions(reorderedOptions);
  };

  const updateOptionContent = (id, newContent) => {
    const updatedOptions = options.map((option) =>
      option.id === id ? { ...option, content: newContent } : option
    );
    setOptions(updatedOptions);
  };

  const removeOption = (id) => {
    const updatedOptions = options.filter((option) => option.id !== id);
    setOptions(updatedOptions);
  };

  return (
    <div className="pt-10">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl overflow-hidden shadow-2xl shadow-blue-300">
        {/* Grid container for two columns */}
        <div className="grid grid-cols-2 bg-indigo-700 border-white">
          {/* Left column for text and options */}
          <div className="w-full h-full" style={{ maxHeight: '550px' }}>
            <div className="flex flex-col h-full w-full pl-10 pt-10 pr-20 pb-10">
              <label className='placeholder-white bg-indigo-700 focus:border-white text-3xl text-white focus:outline-none focus:border-b-2 focus:border-b-white ml-2 min-h-20'>Question 1</label>
              <TextareaAutosize
                className="mt-5 placeholder-white bg-indigo-700 focus:border-white text-md text-white focus:outline-none border-b-2 focus:border-b-white ml-2 min-h-20"
                placeholder="Description (optional)"
                style={{ overflow: 'hidden', resize: 'none' }}
              />
              <label className='placeholder-white bg-indigo-700 focus:border-white text-2xl text-white focus:outline-none focus:border-b-2 focus:border-b-white ml-2 min-h-20 mt-5'>Categories</label>
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="options">
                  {(provided) => (
                    <ul
                      className="text-white text-lg ml-2 mt-5"
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {options.map((option, index) => (
                        <Draggable key={option.id} draggableId={option.id} index={index}>
                          {(provided) => (
                            <li
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className="mb-2"
                            >
                              <div className="flex items-center space-x-2">
                                <div
                                  {...provided.dragHandleProps}
                                  className="cursor-move flex items-center"
                                >
                                  {/* Drag handle (icon or text) */}
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    className="h-7 w-7 text-white"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M4 6h16M4 12h16m-7 6h7"
                                    />
                                  </svg>
                                </div>
                                <input
                                  className="pl-2 py-1 bg-indigo-700 placeholder-white ring-1 ring-white rounded-md focus:outline-white"
                                  placeholder={option.content}
                                  onChange={(e) => updateOptionContent(option.id, e.target.value)}
                                  style={{
                                    overflow: 'hidden',
                                    resize: 'none',
                                    border: 'none',
                                  }}
                                />
                                <div
                                  className="cursor-pointer"
                                  onClick={() => removeOption(option.id)}
                                >
                                  {/* Cross icon for removing the textbox */}
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    className="text-white-500 h-6 w-6 align-baseline"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M6 18L18 6M6 6l12 12"
                                    />
                                  </svg>
                                </div>
                              </div>
                            </li>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </ul>
                  )}
                </Droppable>
              </DragDropContext>
            </div>
          </div>

          {/* Right column for the image */}
          <div className="bg-gray-300 rounded-l-3xl overflow-hidden shadow-lg shadow-white">
            <img
              src="https://img.freepik.com/free-vector/idea-concept-gather-idea-after-brainstorming-creative-innovative-process-with-light-bulb_513217-117.jpg?w=740&t=st=1701510641~exp=1701511241~hmac=ed04ea72a3e56d36ef514d586f9827fc923e330a5a8fca7409d90097f56c5f6c" // Replace with your image URL
              alt="Placeholder"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
