function validateForm(
  callbackElementId: string,
  parentElementSelector: string = ""
) {
  const errors: { [key: string]: string } = {}; // Define the type explicitly
  ["select", "textarea", "input"].forEach((selector) => {
    // Use forEach instead of map for iteration
    document
      .querySelectorAll(`${parentElementSelector} ${selector}`.trim())
      .forEach((element) => {
        if (element instanceof HTMLInputElement || 
            element instanceof HTMLSelectElement || 
            element instanceof HTMLTextAreaElement) {
          const error = validateInput(element);

          if (error) {
            errors[element.name] = error;
          } else {
            delete errors[element.name];
          }
          if (!element.hasAttribute("data-hide-error")) {
            handleErrorDisplay(error, element);
          }
        }
      });
  });
  if (callbackElementId) {
    const callbackElement = document.getElementById(callbackElementId);

    if (callbackElement instanceof HTMLButtonElement || 
        callbackElement instanceof HTMLInputElement) {
      callbackElement.disabled = Object.keys(errors).length > 0;
    }
  }
  return errors;
}

/**
 * Validate the input element.
 * @param {HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement} element - The form element to validate.
 * @returns {string | null} - The validation error message or null if valid.
 */
function validateInput(element: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement): string | null {
  if (element.validity && !element.validity.valid) {
    return element.validationMessage;
  }
  return null;
}

/**
 * Handle the display of error messages.
 * @param {string | null} error - The error message to display or null if no error.
 * @param {Element} element - The input element related to the error.
 */
function handleErrorDisplay(
  error: string | null,
  element: Element,
  errorClass: string = "inputBoxError"
) {
  let errorElement = element.parentElement?.querySelector(
    ".text-red-500.text-sm.py-2"
  );
  if (error) {
    element.classList.add(errorClass);

    if (!errorElement) {
      errorElement = document.createElement("div");
      errorElement.classList.add("text-red-500", "text-sm", "py-2");
      element.parentElement?.appendChild(errorElement);
    }
    if (errorElement) errorElement.textContent = error;
  } else {
    element.classList.remove(errorClass);
    errorElement?.remove();
  }
}

export { validateForm };
