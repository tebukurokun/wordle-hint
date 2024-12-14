import classNames from "classnames";

export function LetterPanel({
  index,
  isYellow,
  isGreen,
  handleLetterClick,
  children,
}: {
  index: number;
  isYellow: boolean;
  isGreen: boolean;
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
        },
        "py-2",
        "min-h-[3rem]",
        "cursor-pointer"
      )}
      onClick={() => handleLetterClick?.(index)}
    >
      <p className={"text-2xl text-white text-center font-bold"}>{children}</p>
    </div>
  );
}
