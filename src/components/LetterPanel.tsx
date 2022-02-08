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
        "bg-neutral-800",
        { "bg-yellow-500": isYellow },
        { "bg-lime-700": isGreen },
        "py-2",
        "min-h-[3rem]",
        "cursor-pointer"
      )}
      onClick={
        handleLetterClick != null
          ? () => handleLetterClick(index)
          : () => {
              // do nothing
            }
      }
    >
      <p className={"text-2xl text-white text-center font-bold"}>{children}</p>
    </div>
  );
}
