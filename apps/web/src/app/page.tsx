import { Button } from "../components/Button";
export default function Home() {
  return (
    <div>
      <h1>Hello world!</h1>
      <Button text="Primary Button" variant="primary" size="md" />
      <Button text="Secondary Button" variant="secondary" size="lg" />
      <Button text="Danger Button" variant="danger" size="sm" fullWidth />
    </div>
  );
}
