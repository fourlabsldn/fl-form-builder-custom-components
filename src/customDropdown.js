import React from 'react';

const emptyTypeInfo = {
  // Compulsory
  type: null,
  displayName: null,
  group: null,
  required: false,

  // Component specific fields
  primitiveType: 'Dropdown',
  title: 'Choose a title',
  options: [],
};

export default function customDropdown(userTypeInfo) {
  const typeInfo = Object.assign({}, emptyTypeInfo, userTypeInfo);

  // For Text Fields the initialState function will only return an object.
  const initialState = () => Object.assign({}, typeInfo);

  const RenderEditor = ({ state, update }) => {
    const updateTitle = event => {
      const newTitle = event.target.value;
      const newState = Object.assign({}, state, { title: newTitle });
      update(newState);
    };

    const titleElement = !state.configShowing
      ? <h2>{state.title}</h2>
      : (
      <h2>
        <input
          type="text"
          className="fl-fb-Field-editable"
          value={state.title}
          onChange={updateTitle}
        />
      </h2>);

    return (
      <div>
        {titleElement}
        <select className="form-control">
          {state.options.map((optionText, idx) => <option key={idx}>{optionText}</option>)}
        </select>
      </div>
    );
  };

  const CustomDropdown = {
    info: typeInfo,
    initialState,
    RenderEditor,
  };

  return CustomDropdown;
}
