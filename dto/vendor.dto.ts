import { ObjectId } from "mongoose"

export interface CreateVendorInput{
    name: string,
    ownerName: string,
    email: string,
    foodType: [string],
    password: string,
    phoneNo: string,
    location: string
}

export interface vendorLoginInput{
    email: string,
    password: string
}

export interface VendorPayload{
    _id: string,
    name: string,
    email: string,
    foodType: [string]
}