const bankName = {
    type: String,
    minlength: 8,
    maxlength: 50,
    validate: {
        validator: function(value: string) { return /^[a-zA-Z\s]+$/.test(value) },
        message: (props: { value: string }) => `${props.value} is not a valid bank name!`
    },
    required: true,
    trim: true,
}

const bankNickname = {
    type: String,
    length: 4,
    required: true,
    trim: true,
    uppercase: true,
}

const customerName = {
    type: String,
    minlength: 4,
    maxlength: 40,
    required: true,
    trim: true,
}

const dateCreated = { 
    type: Date,
    default: Date.now
}

const username = {
    type: String,
    minlength: 8,
    maxlength: 40,
    required: true,
    trim: true,
}

export { bankName, bankNickname, customerName, dateCreated, username }