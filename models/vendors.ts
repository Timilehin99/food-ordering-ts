import mongoose, {Document, Schema} from "mongoose"

interface vendorDoc{
    name: string,
    ownerName: string,
    email: string,
    foodType: [string],
    pinCode: number,
    password: string,
    phoneNo: string,
    location: string,
    serviceAvailable: boolean,
    coverImage: [string],
    rating: number,
    dateCreated: Date,
    foods: any

}

const vendorSchema = new Schema<vendorDoc>({
    name :{type: String, required: true},
    ownerName: {type: String, required: true},
    email: {type: String, required: true},
    coverImage: {type: [String]},
    foodType: {type: [String], required: true},
    password: {type: String, required: true},
    phoneNo: {type: String, required: true},
    location:{type: String, required: true},
    pinCode:{type: Number},
    serviceAvailable:{ type: Boolean, default: false},
    rating: {type: Number, default: 0},
    foods: [{type: mongoose.SchemaTypes.ObjectId,
        ref: "food"
    }]

},{
    toJSON:{
        transform(doc, ret){
            delete ret.password,
            delete ret.email,
            delete ret.createdAt,
            delete ret.updatedAt,
            delete ret._id,
            delete ret.__v
        }
    },
    timestamps: true
})

const Vendor = mongoose.model('vendor', vendorSchema)

export{ Vendor }