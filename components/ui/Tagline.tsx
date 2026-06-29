type TaglineProps = {
  className?: string;
};

export function Tagline({ className = "" }: TaglineProps) {
  return (
    <span className={className}>
      we&apos;re <em className="italic">nuts</em> about christmas lights!
    </span>
  );
}
