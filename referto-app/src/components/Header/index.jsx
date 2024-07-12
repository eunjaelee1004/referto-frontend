import logo from "../../assets/images/logo.svg";
import user from "../../assets/images/user.svg";
import { Link } from "react-router-dom";
import LogInModal from "../Modals/LogIn";
import SignUpModal from "../Modals/SignUp";
import { useState, useEffect } from "react";
import { getCookie, removeCookie } from "../../utils/cookie";

const Header = () => {
  const [showLogIn, setShowLogIn] = useState(true);
  const [showSignUp, setShowSignUp] = useState(false);

  const openLogInModal = () => {
    console.log("openLogIn");
    setShowLogIn(true);
  };

  const closeLogInModal = () => {
    console.log("closeLogIn");
    setShowLogIn(false);
  };

  const openSignUpModal = () => {
    console.log("openSignup");
    setShowSignUp(true);
  };

  const closeSignUpModal = () => {
    console.log("closeSignup");
    setShowSignUp(false);
  };

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = !!getCookie("access_token");
    setIsUserLoggedIn(loggedIn);
    if (loggedIn) {
      setShowLogIn(false);
      setShowSignUp(false);
    }
    console.log("useEffect " + loggedIn);
  }, []);

  const handleSignOut = () => {
    removeCookie("access_token");
    removeCookie("refresh_token");
    window.location.href = "/";
    setIsUserLoggedIn(!isUserLoggedIn)
  };

  return (
    <div className="flex w-full h-[65px] items-center justify-between px-10 py-0 relative bg-neutral-700">
      <div className="inline-flex items-center justify-center gap-2.5 relative flex-[0_0_auto]">
        <div className="flex w-[145px] items-center gap-2.5 relative">
          <Link to="/1" className="relative w-[146.54px] h-[38px] mr-[-1.54px]">
            <img
              className="absolute w-[26px] h-7 top-[5px] -left-px"
              alt="logo"
              src={logo}
            />
            <div className="absolute top-0 left-[34px] [font-family:'Pretendard-ExtraBold',Helvetica] font-bold text-neutral-50 text-[25px] tracking-[0] leading-[37.5px] whitespace-nowrap">
              REFERTO
            </div>
          </Link>
        </div>
      </div>
      <div className="inline-flex items-center justify-end gap-2.5 relative self-stretch flex-[0_0_auto]">
        <div className="inline-flex items-center justify-center gap-2.5 relative self-stretch flex-[0_0_auto]">
          {isUserLoggedIn ? (
            <div className="flex flex-row">
              <div className="w-fit mx-3 [font-family:'Pretendard-Medium',Helvetica] font-medium text-neutral-50 text-lg text-center">
                {/*getCookie("user_email")*/}User 1
              </div>
              <img alt="profile" src={user} className="mr-5" />
              <Link
                to="/"
                onClick={handleSignOut}
                className=" w-fit ml-5 [font-family:'Pretendard-Medium',Helvetica] font-medium text-neutral-50 text-lg text-center"
              >
                Sign Out
              </Link>
            </div>
          ) : (
            <div className="items-center justify-center flex">
              <div
                className="relative w-fit [font-family:'Pretendard-Medium',Helvetica] font-medium text-neutral-50 text-lg text-center tracking-[0] leading-6 whitespace-nowrap cursor-pointer"
                onClick={openLogInModal}
              >
                Log In
              </div>
              {showLogIn && (
                <LogInModal
                  onClose={closeLogInModal}
                  onSwitch={openSignUpModal}
                />
              )}
              {showSignUp && (
                <SignUpModal
                  onClose={closeSignUpModal}
                  onSwitch={openLogInModal}
                  isUserLoggedIn={isUserLoggedIn}
                  setIsUserLoggedIn={setIsUserLoggedIn}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
