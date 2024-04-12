import nodemailer from "nodemailer"

import { Contact } from "../models/contact";

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'my email',
    pass: 'password',
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
    const contact = new Contact({ name, email, subject, message })

    await contact.save()
      // The subject and the text response code is temporary, not the final product
    sendEmail({
      from: 'my email',
      to: email,
      subject: `Confirmation: We received your message!`,
      text: `Hello ${name},\n\nThank you for reaching out. We have received your message and will get back to you soon!\n\nBest,\nYour Team`
    })

    sendEmail({
      from: 'your-email@gmail.com',
      to: 'your-receiving-email@example.com',
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