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
        "w-16",
        "h-16",
        "bg-neutral-800",
        { "bg-yellow-500": isYellow },
        { "bg-lime-700": isGreen },
        "mb-1",
        "mt-2",
        "py-3"
      )}
      onClick={
        handleLetterClick != null
          ? () => handleLetterClick(index)
          : () => {
              // do nothing
            }
      }
    >
      <p className={"text-2xl text-white text-center"}>{children}</p>
    </div>
  );
}
