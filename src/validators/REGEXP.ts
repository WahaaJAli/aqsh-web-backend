const bankNameRegex: RegExp = /^[a-zA-Z\s]+$/
const emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const passwordRegex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
const specialCharRegex: RegExp = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/

export {bankNameRegex, emailRegex, passwordRegex, specialCharRegex}