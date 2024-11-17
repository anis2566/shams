import { Metadata } from "next";
import { ContactForm } from "./_components/contact-form";

export const metadata: Metadata = {
    title: "Shams Publications | Contact",
    description: "Contact page.",
};

const Contact = () => {
    return <ContactForm />
}

export default Contact
