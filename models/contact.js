import mongoose from "mongoose";

const Schema = mongoose.Schema;

const contactSchema = new Schema ({
  name: {
    type: String
  },
  email: {
    type: String
  },
  subject: {
    type: String
  },
  message: {
    type: String
  },
})

const Contact = mongoose.model('Contact', contactSchema)

export { Contact }