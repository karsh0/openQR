type ButtonProps = {
    title: string;
    onClick: () => void;
    dark?: boolean;
  };
  
  export function Button({ title, onClick, dark }: ButtonProps) {
    return (
        <button
          className={`px-3 py-3 w-full cursor-pointer rounded-xl ${dark ? "bg-black text-white" : "bg-white text-black"}`}
          onClick={onClick}
        >
          {title}
        </button>
    );
  }
  