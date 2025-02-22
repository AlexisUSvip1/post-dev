export const validateTextLength = (text: string, maxLength = 250) => {
    return text.length > maxLength ? text.substring(0, maxLength) : text;
  };