import { getTranslations } from 'next-intl/server'
import ContactForm from './contact-form'

export default async function ContactPage() {
  await getTranslations('contact') 

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="w-[50%] h-[80%]">
        <ContactForm/>
      </div>
    </div>
  )
}
