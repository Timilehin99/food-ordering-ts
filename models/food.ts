import mongoose, {Schema, Document, Model} from "mongoose"

interface FoodDoc extends Document {

    name:string,
    description:string,
    category:string,
    foodType:string,
    images:[string],
    prepTime: number,
    rating: number,
    price: number
 
}

const FoodSchema = new Schema({

    vendorId: {type : String},
    name: {type:String, required : true},
    description: {type: String,required: true},
    category : {type: String},
    foodType : {type: String, required : true},
    prepTime : {type: Number},
    rating:{type : Number, default : 0},
    images: {type: [String]},
    price : {type: Number}

},{
    toJSON: {
        transform(doc, ret){
            delete ret.__v,
            delete ret.createdAt,
            delete ret.updatedAt
        }

    },
    timestamps: true
})

const Food = mongoose.model<FoodDoc>('food', FoodSchema)

export {Food}

