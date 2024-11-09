import argon2 from 'argon2'

export const encrpytPassword = async(password: string): Promise<string> => {
    try {
        return await argon2.hash(password)
    }
    catch (error) {
        throw new Error('Failed to encrypt password')
    }
}

export const decryptPassword = async(encryptionKey: string, password: string): Promise<boolean> => {
    try {
        return await argon2.verify(encryptionKey, password)
    } 
    catch (error) {
        throw new Error('Failed to verify password')
    }
}