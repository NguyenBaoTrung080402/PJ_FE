const ValidateTel = (tel) =>{
    const telRegex = /^[0-9]{10}$/;
    return telRegex.test(tel);
}
const validateInputText = (text) =>{
    return text.length >= 5;
}
const validateMail = (mail) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@gmail\.com$/;
  return emailRegex.test(mail);
};

function hasSpecialCharacters(inputString) {
  var regex = /[^\x00-\x7F]/;
  return regex.test(inputString);
}
// format tiền
const formatCurrency = (amount) => {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2, 
    });
  
    return formatter.format(amount);
  }

  // fomat date time
const formatDateTime = (inputDateTime) => {
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    };
  
    const formattedDateTime = new Date(inputDateTime).toLocaleString('vi-VN', options);
  
    return formattedDateTime;
  };

  const isValidBase64String = (base64String) => {
    const regex = /^data:image\/(jpeg|png);base64,/;
    return regex.test(base64String);
  };

  const convertBase64ToBlob = (base64String) => {
    if (isValidBase64String(base64String)) {
      const binaryString = window.atob(base64String.split(',')[1]);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      const blob = new Blob([bytes], { type: 'image/jpeg' });
      return URL.createObjectURL(blob);
    } else {
      // console.log('Base64 string:', base64String);
      return null;
    }
  };

export {ValidateTel,validateInputText, validateMail, formatCurrency, formatDateTime, hasSpecialCharacters, convertBase64ToBlob}