import { Button, Html, Head, Body, Heading } from "@react-email/components";

export default function Email({ firstName, message }: { firstName: string; message: string }) {
  return (
    <Html>
      <Heading>Mail from rasmus-diessel.com. Sender Name: {firstName}</Heading>
      <Body>{message}</Body>
    </Html>
  );
}
