import userIcon from "../assets/user.png";
import useAuth from "../hooks/useAuth";
import { logoutUser } from "../lib/User";
export default function LoggedInIcon({setShowLogin}){
    const { loggedIn, setLoggedIn, user } = useAuth();
    const dropdown = [
      {
        name: "Order History",
        link: () => {window.location.href = "/orders";}
      },
      {
        name: "Logout",
        link: async () => {await logoutUser(); setLoggedIn(false);},
      },
];
    return(<>
        {loggedIn && (<div className="relative group">

      <a href="/Account"><button className="pt-2">
        <img className=" w-5" src={userIcon} alt="user" />
      </button></a>

      <div
        className="
          absolute
          top-full
          left-0
          opacity-0
          invisible
          group-hover:opacity-100
          group-hover:visible
          transition-all
          duration-300
          bg-white
          shadow-xl
          p-4
          w-56
          z-50
        "
      >

        {dropdown.map((item, index) => (

          <button key={index} onClick={item.link} className="block w-full text-left hover:text-blue-600">
            {item.name}
          </button>

        ))}

      </div>

    </div>
    )}

    {!loggedIn && (
              <button onClick={() => setShowLogin(true)}>Login</button>
            )}
    </>
    )
}