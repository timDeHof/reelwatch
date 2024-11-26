interface ButtonProps {
  onClick: () => void;
  text: string;
}

export default function Button(props: ButtonProps) {
  return (
    <button
      className="rounded-lg bg-black p-2 px-4 text-lg text-white"
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
}
export function RemoveButton(props: ButtonProps) {
  return (
    <button
      className="flex place-content-end bg-transparent text-lg text-gray-700
      before:content-[url('../assets/remove.svg')]"
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
}
export function WatchButton(props: ButtonProps) {
  return (
    <button
      className="flex place-content-end bg-transparent text-lg text-gray-700
      before:content-[url('../assets/add.svg')]"
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
}

export function SearchButton(props: ButtonProps) {
  return (
    <button
      className="rounded-r-lg bg-black p-2 px-4 text-lg text-white"
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
}
