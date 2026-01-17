export default function ScoreBadge({ score }: { score: number }) {
  let bgColor = "bg-badge-red text-badge-red-text";
  let label = "Needs Work";

  if (score > 70) {
    bgColor = "bg-badge-green text-badge-green-text";
    label = "Strong";
  } else if (score > 49) {
    bgColor = "bg-badge-yellow text-badge-yellow-text";
    label = "Good Start";
  }

  return (
    <div className={`score-badge ${bgColor}`}>
      <p>{label}</p>
    </div>
  );
}