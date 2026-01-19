type LegendItem = {
  name: string;
  value: number;
  color: string;
};

type PieLegendProps = {
  items: LegendItem[];
};

export default function PieLegend({ items }: PieLegendProps) {
  return (
    <ul className="mt-4 space-y-2">
      {items.map((item) => (
        <li
          key={item.name}
          className="flex items-center justify-between text-sm"
        >
          <div className="flex items-center gap-2">
            <span
              className="h-3 w-3 rounded-sm"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-muted-foreground">{item.name}</span>
          </div>
          <span className="font-medium text-foreground">
            ${item.value}
          </span>
        </li>
      ))}
    </ul>
  );
}
