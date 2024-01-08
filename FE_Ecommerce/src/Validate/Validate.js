const ValidateTel = (tel) =>{
    const telRegex = /^[0-9]{10}$/;
    return telRegex.test(tel);
}
const validateInputText = (text) =>{
    return text.length >= 5;
}
const validateMail = (mail) =>{
    const emailRegex = /^[a-zA-Z0-9._-]+@gmail\.com$/;
    return emailRegex.test(mail)
}
export {ValidateTel,validateInputText, validateMail}