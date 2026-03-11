import { Html } from '@react-email/html'

export default function Email({ firstName, message }: { firstName: string; message: string }) {
  return (
    <Html>
      {message}
    </Html>
  );
}
