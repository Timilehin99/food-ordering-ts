import mongoose, {Document, Schema} from "mongoose"

interface vendorDoc{
    name: string,
    ownerName: string,
    email: string,
    foodType: [string],
    password: string,
    phoneNo: string,
    location: string,
    serviceAvailable: boolean,
    rating: number,
    dateCreated: Date,
    foods: any

}

const vendorSchema = new Schema<vendorDoc>({
    name :{type: String, required: true},
    ownerName: {type: String, required: true},
    email: {type: String, required: true},
    foodType: {type: [String], required: true},
    password: {type: String, required: true},
    phoneNo: {type: String, required: true},
    location:{type: String, required: true},
    serviceAvailable:{ type: Boolean, default: false},
    rating: {type: Number, default: 0},
    foods: {type: [mongoose.SchemaTypes.ObjectId],
        ref: "food"
    }

},{
    timestamps: true
})

const Vendor = mongoose.model('vendor', vendorSchema)

export{ Vendor }