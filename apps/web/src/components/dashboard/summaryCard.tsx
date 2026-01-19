type Props = {
  label: string;
  value: string;
};
const summaryCard = ({ label, value }: Props) => {
  return (
    <div className="rounded-lg bg-card p-4 shadow-sm">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-foreground">{value}</p>
    </div>
  );
};

export default summaryCard;
