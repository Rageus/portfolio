import { Heading } from '@react-email/heading'
import { Html } from '@react-email/html'

export default function Email({ firstName, message }: { firstName: string; message: string }) {
  return (
    <Html>
      <Heading>Mail from rasmus-diessel.com. Sender Name: {firstName}</Heading>
      {message}
    </Html>
  );
}
