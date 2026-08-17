import ContactData from "@/components/site/ContactData";
import ContactForm from "@/components/site/ContactForm";
import GoogleMap from "@/components/site/GoogleMap";

export default function Contact() {
  return (
    <div className="w-full flex flex-col gap-10 md:gap-20 max-w-[500px] md:max-w-[1200px] mx-auto px-4 md:px-14">
      <div className="flex flex-col lg:flex-row gap-10 md:gap-20">
        <ContactData />
        <section className="flex-1">
          <ContactForm topic="question" />
        </section>
      </div>
      <GoogleMap />
    </div>
  );
}
