import bcrypt from "bcrypt";

const salt_rounds = 10

export const hashPassword = async (password:string)=>{
    return await bcrypt.hash(password, salt_rounds)
}

export const verifyPassword = async (password:string, hash: string)=>{
    return await bcrypt.compare(password,hash)
}