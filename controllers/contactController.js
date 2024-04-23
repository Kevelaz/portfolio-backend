import { Contact } from "../models/contact.js";
import nodemailer from "nodemailer";


const { MY_EMAIL, PASSWORD } = process.env

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: MY_EMAIL,
    pass: PASSWORD,
  }
})

const sendEmail = (emailOptions) => {
  transporter.sendMail(emailOptions, function(error,info){
    if(error) {
      console.log('Error sending mail:', error)
    } else {
      console.log('Email sent:' + info.response)
    }
  })
}

const handleContactInfo = async(req,res) => {
  const { name, email, subject, message } = req.body 

  try {
    const contact = new Contact({ name, email, subject, message, })

    await contact.save()
      // The subject and the text response code is temporary, not the final product
    sendEmail({
      from: MY_EMAIL,
      to: email,
      subject: `Confirmation: I received your message!`,
      text: `Hello ${name},\n\nThank you for reaching out. I have received your message and will get back to you soon!\n\nBest,\nKevin Velazquez`
    })

    sendEmail({
      from: MY_EMAIL,
      to: MY_EMAIL,
      subject: `New Contact Form Submission: ${subject}`,
      text: `You have received a new message from ${name} (${email}):\n\n${message}`
    })
    res.status(200).json({message: 'Your message has been sent sucessfully'})
  } catch (error) {
    console.error('Error processing contact form:', error);
    res.status(500).json({ message: 'Failed to send your message. Please try again.' })
  }
}

export { handleContactInfo }