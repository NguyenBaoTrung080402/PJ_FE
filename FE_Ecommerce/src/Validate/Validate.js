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
    const formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0, 
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

export {ValidateTel,validateInputText, validateMail, formatCurrency, formatDateTime, hasSpecialCharacters}