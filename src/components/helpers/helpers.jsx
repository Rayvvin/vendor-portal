export function toTitleCase(str) {
    if(str){
        return str
      .toLowerCase()
      .split(" ")
      .map(function (word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(" ");
    }
    else{
        return null
    }
    
  }



  /**
 * Function to generate a single multipart/form-data object from a list of file objects.
 * @param {Array<File>} files - Array of file objects to be included in the form data.
 * @param {Object} additionalData - Optional additional data to be included in the form data.
 * @returns {FormData} - The generated FormData object.
 */
export const createMultipartFormData = (files, additionalData = {}) => {
  const formData = new FormData();

  // Append each file to the FormData object
  files.forEach((file, index) => {
      formData.append(`file${index}`, file, file.name);
  });

  // Append additional data to the FormData object
  for (const key in additionalData) {
      if (Object.prototype.hasOwnProperty.call(additionalData, key)) {
          formData.append(key, additionalData[key]);
      }
  }

  return formData;
};
