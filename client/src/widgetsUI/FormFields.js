import React from 'react';

const FormFields = ({formData, handleChange,id}) => {

  const renderTemplate = () => {
    let formTemplate = null;

    const showError = () => {
      let errorMsg = null;

      if (formData.validation && !formData.valid) {
        errorMsg = (
          <div className="error">
            {formData.validationMessage}
          </div>
        )
      }
      return errorMsg;
    };

    switch (formData.element) {
      case 'input':
        formTemplate = (
          <div>
            <input
              {...formData.config}
              value={formData.value}
              onBlur={event=> handleChange({event, id, blur: true})}
              onChange={event => handleChange({event, id, blur: false})}
            />
            {showError()}
          </div>
        );
        break;
      case 'select':
        formTemplate = (
          <div>
            <select
              {...formData.config}
              value={formData.value}
              onBlur={event=> handleChange({event, id, blur: true})}
              onChange={event => handleChange({event, id, blur: false})}
            >
              {
                formData.options.map(( opt, i ) => (
                  <option
                    val={opt[0]}
                    key={i}
                  >
                    {opt[1]}
                  </option>
                ))
              }
            </select>
            {showError()}
          </div>
        );
        break;
      case 'textarea':
        formTemplate = (
          <div>
            <textarea
              {...formData.config}
              value={formData.value}
              onBlur={event=> handleChange({event, id, blur: true})}
              onChange={event => handleChange({event, id, blur: false})}
            />
            {showError()}
          </div>
        );
        break;
      default:
        formTemplate = null;
    }

    return formTemplate;
  }

  return (
    <div>
      {renderTemplate()}
    </div>
  );
};

export default FormFields;
