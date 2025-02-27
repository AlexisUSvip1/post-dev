export const validateTextLength = (text: string, maxLength = 2050) => {
    return text.length > maxLength ? text.substring(0, maxLength) : text;
  };