import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { Link, useNavigate } from "react-router-dom";


export function Navbar() {

  const navigate = useNavigate()

  return (
    <nav className="max-h-15 w-full">
      <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">
        <div
          className="text-xl font-semibold tracking-wide flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <span className="w-8">
            <img
              src="https://images.g2crowd.com/uploads/product/image/large_detail/large_detail_425ddb607e85f91b24ff371f81faab44/qrfy.png"
              alt="Logo"
            />
          </span>
          <span className="text-blue-600 text-xl">openQR</span>
        </div>

        <div className="flex items-center space-x-4">
          <SignedIn>
          <Link className="mr-10" to={'/dashboard'}>
            Dashboard
          </Link>
          </SignedIn>
           <SignedOut>
             <SignInButton>
               <button className="bg-blue-600 hover:bg-blue-500 md:text-sm text-xs px-4 py-2 md:px-5 md:py-2 rounded-lg cursor-pointer flex items-center justify-center text-white font-semibold">
                 Sign In
               </button>
             </SignInButton>
           </SignedOut>
        
           <SignedIn>
             <UserButton signInUrl="/dashboard" afterSignOutUrl="/" />
           </SignedIn>
         </div>
      </div>
    </nav>
  );
}
