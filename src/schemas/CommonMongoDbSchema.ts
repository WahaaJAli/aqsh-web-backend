import { bankNameRegex, emailRegex, passwordRegex } from "../validators/REGEXP"

const bankName = {
    type: String,
    maxlength: 50,
    minlength: 8,
    required: true,
    trim: true,
    unique: true,
    validate: {
        validator: function(value: string) { return bankNameRegex.test(value) },
        message: (props: { value: string }): string => `${props.value} is not a valid bank name!`
    },
}

const bankNickname = {
    type: String,
    length: 4,
    required: true,
    trim: true,
    unique: true,
    uppercase: true,
}

const customerName = {
    type: String,
    maxlength: 40,
    minlength: 4,
    required: true,
    trim: true,
}

const dateCreated = { 
    type: Date,
    default: Date.now
}

const email =  {
    type: String,
    lowercase: true,
    required: true,
    trim: true,
    unique: true,
    validate: {
        validator: function(value: string) { return emailRegex.test(value)},
        message: (props: { value: string}): string => `${props.value} is not a valid email address!`
    }
}

const password = {
    type: String,
    required: true,
    trim: true,
}

const username = {
    type: String,
    maxlength: 40,
    minlength: 8,
    required: true,
    trim: true,
}

export { bankName, bankNickname, customerName, dateCreated, email, password, username }