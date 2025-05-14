type ButtonProps = {
    title: string;
    onClick: () => void;
    dark?: boolean;
  };
  
  export function Button({ title, onClick, dark }: ButtonProps) {
    return (
        <button
          className={`p-2 text-sm md:text-lg md:px-3 md:py-3 w-full cursor-pointer rounded-xl ${dark ? "bg-black text-white" : "bg-white text-black"}`}
          onClick={onClick}
        >
          {title}
        </button>
    );
  }
  