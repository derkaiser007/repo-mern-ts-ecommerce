import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter Name"],
    },
    photo: {
      type: String,
      required: [true, "Please enter Photo"],
    },
    price: {
      type: Number,
      required: [true, "Please enter Price"],
    },
    stock: {
      type: Number,
      required: [true, "Please enter Stock"],
    },    
    category: {
      type: String,
      required: [true, "Please enter Category"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);
// The { timestamps: true } option in a Mongoose schema enables automatic management of createdAt and updatedAt 
// fields for the documents. These fields are useful for tracking when a document was created and last updated.

export const Product = mongoose.model("Product", schema);

/*
mongoose.Schema():
1)mongoose.Schema is a constructor in Mongoose used to define the structure of documents in a MongoDB collection.
2)The first argument is an object that defines the fields and their data types in the collection.
3)The second argument is an object that defines additional options for the schema, such as timestamps. 

mongoose.model():
1)This function is used to create a Mongoose model. A model is a wrapper around the Mongoose schema, 
providing an interface to interact with the MongoDB database collection.
2)The first argument, "Product", is the name of the model. Mongoose will look for or create a MongoDB collection 
named the pluralized and lowercase form of this name (e.g., products).
3)The second argument, schema, is the schema object that defines the structure, data types, and validation rules 
for documents in this collection.

export const Product: By using export, the Product model is made available for import in other files of your 
application. This enables you to perform CRUD (Create, Read, Update, Delete) operations on the products collection 
using this model.
*/