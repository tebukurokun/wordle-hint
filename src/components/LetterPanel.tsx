import classNames from "classnames";

export function LetterPanel({
  index,
  isYellow,
  isGreen,
  compact = false,
  handleLetterClick,
  children,
}: {
  index: number;
  isYellow: boolean;
  isGreen: boolean;
  compact?: boolean;
  handleLetterClick?: (letterIndex: number) => void;
  children: string;
}) {
  return (
    <div
      className={classNames(
        {
          "bg-neutral-800": !isYellow && !isGreen,
          "bg-amber-400": isYellow,
          "bg-emerald-600": isGreen,
          "py-2 min-h-[3rem] cursor-pointer": !compact,
          "py-1 min-h-[2.25rem]": compact,
        },
        "rounded-md",
        "transition-colors",
      )}
      onClick={() => handleLetterClick?.(index)}
    >
      <p
        className={classNames(
          compact ? "text-xl" : "text-2xl",
          "text-white text-center font-bold",
        )}
      >
        {children}
      </p>
    </div>
  );
}
