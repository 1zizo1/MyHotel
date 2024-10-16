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
                        (<Link to="/sign-in" className="text-blue-600 px-4 py-2 font-bold bg-white border border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-colors duration-300 shadow-md hover:shadow-lg">
                            Sign In
                        </Link>)
                    }

                </span>
            </div>
        </div>
    );
};
export default Header;