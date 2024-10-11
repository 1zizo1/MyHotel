import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";
const Header = () => {
    const { isLoggedIn } = useAppContext()
    return (
        <div className="bg-blue-800 py-6 w-full ">
            <div className="container mx-auto flex justify-between">
                <span className=" text-3xl text-white font-bold tracking-tight">
                    <Link to="/">MyHotel</Link>
                </span>
                <span className="felx space-x-2">
                    {isLoggedIn ? (<>
                        <Link
                            to="/my-bookings"
                            className="text-white hover:bg-blue-600 px-3 py-2 rounded-md transition-colors duration-300"
                        >
                            My Bookings
                        </Link>
                        <Link
                            to="/my-hotels"
                            className="text-white hover:bg-blue-600 px-3 py-2 rounded-md transition-colors duration-300"
                        >
                            My Hotels
                        </Link>
                        <SignOutButton />
                    </>
                    ) :
                        (<Link to="/sign-in" className="flex bg-white items-center text-blue-600 px-3 py-2 font-bold hover:bg-gray-100">
                            Sign In
                        </Link>)
                    }

                </span>
            </div>
        </div>
    );
};
export default Header;