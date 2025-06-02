type ButtonProps = {
    title: string;
    onClick?: () => void;
    dark?: boolean;
  };
  
  export function Button({ title, onClick, dark }: ButtonProps) {
    return (
        <button
          className={`p-2 text-sm md:text-lg md:px-3 md:py-2 w-full cursor-pointer rounded-xl ${dark ? "bg-blue-600 text-white" : "bg-white text-black"}`}
          onClick={onClick}
        >
          {title}
        </button>
    );
  }
  