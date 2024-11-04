import argon2 from 'argon2'

export const hashPassword = async (password: string): Promise<string> => {
    try {
        return await argon2.hash(password)
    }
    catch (error) {
        throw new Error('Failed to hash password')
    }
}

export const verifyPassword = async (hash: string, password: string): Promise<boolean> => {
    try {
        return await argon2.verify(hash, password)
    } 
    catch (error) {
        throw new Error('Failed to verify password')
    }
}