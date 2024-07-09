import { X } from "lucide-react";
import { useState } from "react";
import { signUp } from "../../apis/api";
import Google from "../../assets/images/Google_SI.png";

const SignUpModal = ({ onClose, onSwitch }) => {
  const [signUpData, setSignUpData] = useState({
    email: "",
    password: "",
    confirm_password: "",
  });

  const handleSignUpData = (e) => {
    const { id, value } = e.target;
    setSignUpData({ ...signUpData, [id]: value });
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    signUp(signUpData);
    onClose();
  };

  const handleLogInSwitch = () => {
    onClose();
    onSwitch();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-700 bg-opacity-70 z-10">
      <div className="w-[400px] h-1/2 px-[30px] pt-6 pb-[30px] bg-neutral-50 rounded-[20px] flex-col justify-center items-center gap-[7px] inline-flex">
        <div className="self-stretch justify-end items-center gap-2.5 inline-flex">
          <X
            className="w-[18px] h-[18px] relative cursor-pointer"
            onClick={onClose}
          />
        </div>
        <div className="self-stretch h-full flex-col justify-start items-center gap-6 flex">
          <div className="self-stretch h-full flex-col justify-start items-center gap-2.5 flex py-8">
            <div className="self-stretch text-center text-neutral-900 text-2xl font-black font-['Pretendard'] leading-9">
              Sign Up
            </div>
            <div className="text-center font-['Pretendard'] font-semibold">
              Enter your email and password to sign up
            </div>
            <form onSubmit={handleSignUpSubmit}>
              <input
                required
                type="text"
                placeholder="email"
                id="email"
                value={signUpData.email}
                onChange={handleSignUpData}
                className="input border m-2 px-4 py-2 rounded-md w-full"
              />
              <input
                required
                type="password"
                placeholder="password"
                id="password"
                value={signUpData.password}
                onChange={handleSignUpData}
                className="input border m-2 px-4 py-2 rounded-md w-full"
              />
              <button
                type="submit"
                className="bg-black text-white font-black m-2 px-4 py-2 rounded-md w-full"
              >
                SIGN UP
              </button>
            </form>
            <div className="text-center font-['Pretendard'] text-gray-700">
              Already have an account?
            </div>
            <button className="underline" onClick={handleLogInSwitch}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignUpModal;
