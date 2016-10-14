define(['react'], function (React) { 'use strict';

React = 'default' in React ? React['default'] : React;

const emptyTypeInfo = {
  // Compulsory
  type: null,
  displayName: null,
  group: null,
  required: false,

  // Component specific fields
  primitiveType: 'Dropdown',
  title: 'Choose a title',
  options: []
};

function customDropdown(userTypeInfo) {
  const typeInfo = Object.assign({}, emptyTypeInfo, userTypeInfo);

  // For Text Fields the initialState function will only return an object.
  const initialState = () => Object.assign({}, typeInfo);

  const RenderEditor = ({ state, update }) => {
    const updateTitle = event => {
      const newTitle = event.target.value;
      const newState = Object.assign({}, state, { title: newTitle });
      update(newState);
    };

    const titleElement = !state.configShowing ? React.createElement(
      'h2',
      null,
      state.title
    ) : React.createElement(
      'h2',
      null,
      React.createElement('input', {
        type: 'text',
        className: 'fl-fb-Field-editable',
        value: state.title,
        onChange: updateTitle
      })
    );

    return React.createElement(
      'div',
      null,
      titleElement,
      React.createElement(
        'select',
        { className: 'form-control' },
        state.options.map((optionText, idx) => React.createElement(
          'option',
          { key: idx },
          optionText
        ))
      )
    );
  };

  const CustomDropdown = {
    info: typeInfo,
    initialState,
    RenderEditor
  };

  return CustomDropdown;
}

var flFormBuilderCustomComponents = {
  customDropdown
};

return flFormBuilderCustomComponents;

});

//# sourceMappingURL=fl-form-builder-custom-components.js.map
