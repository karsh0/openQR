
export function Input({placeholder, ref}:{placeholder:string, ref:any}){
    return <input 
        className="w-full bg-white border border-gray-600 text-gray-600  rounded-md px-4 py-2"
        type="text"
        placeholder={placeholder}
        ref={ref}
        />
}