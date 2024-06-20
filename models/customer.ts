import mongoose, {Schema, Document, Model} from "mongoose"

export interface CustomerDoc extends Document {

    email: string,
    username: string
    password: string,
    address: string,
    phone: string,
    verified: boolean,
    otp: number,
    otp_expiry: number,
    lat: number,
    long: number   
 
}

const CustomerSchema = new Schema({

    email: {type : String, required: true},
    password: {type:String, required : true},
    username: {type: String,required: true},
    address : {type: String},
    verified : {type: Boolean, default: false},
    otp : {type: Number},
    otp_expiry:{type : Number, default : 0},
    images: {type: [String]},
    lat: {type: Number},
    long: {type: Number}

},{
    toJSON: {
        transform(doc, ret){
            delete ret.__v,
            delete ret.createdAt,
            delete ret.updatedAt
            delete ret.password
        }

    },
    timestamps: true
})

const Customer = mongoose.model<CustomerDoc>('customer', CustomerSchema)

export {Customer}