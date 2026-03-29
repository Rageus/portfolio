
export default function Email({ firstName, message }: { firstName: string; message: string }) {
  return (
    <html>
      sender name: {firstName}
      {message}
    </html>
  );
}
