import { getTranslations } from 'next-intl/server'
import ContactForm from './contact-form'

export default async function ContactPage() {
  await getTranslations('contact') 

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="w-full max-w-2xl h-full">
        <ContactForm/>
      </div>
    </div>
  )
}
