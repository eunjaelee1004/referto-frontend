import { useState, useRef } from "react";
import { signUp, getUser, getAssignments } from "../../apis/api";
import { useNavigate } from "react-router-dom";
import AlertModal from "./AlertModal";
import alertCircle from "../../assets/images/alert-circle.svg";
import Google from "../../assets/images/Google.png"

const SignUpModal = ( props ) => {
  const { isUserLoggedIn, setIsUserLoggedIn} = props;
  const navigate = useNavigate()
  const [errorAlertModalIsOpen, setErrorAlertModalIsOpen] = useState(false);
  const inputRef = useRef(null);
  const handleErrorAlertCancel = () => {
    setErrorAlertModalIsOpen(false);
    if (inputRef.current) {
      inputRef.current.focus();
    };
  };
  const [signUpData, setSignUpData] = useState({
    email: "",
    password: "",
  });

  const handleSignUpData = (e) => {
    const { id, value } = e.target;
    setSignUpData({ ...signUpData, [id]: value });
  };

  const handleRedirect = async () => {
    const getUserAPI = async () => {
      const user = await getUser();
      return user;
    };

    const fetchAssignments = async (email) => {
      try {
        const assignments = await getAssignments(email);
        return assignments[0]["assignment_id"]; // Return the first id
      } catch (error) {
        console.error("Error fetching assignments:", error);
      }
    };

    const user = await getUserAPI();
    const firstAssignmentId = await fetchAssignments(user.email);

    if (firstAssignmentId) {
      navigate(`/${firstAssignmentId}`);
    } else {
      console.error("First assignment ID is null");
    }
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUp(signUpData);
      setIsUserLoggedIn(true);
      handleRedirect();
    } catch (error) {
      console.error('Error signing up:', error);
      setErrorAlertModalIsOpen(true);
    }
  };

  const handleGoogleLogin = async(e) => {
    e.preventDefault();
    try {
      // await GoogleSignIn()
    } catch (error) {
      console.error('Error logging in:', error);
    }
  }


  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-200 z-50">
      <div className="w-[400px] h-100% px-[30px] pt-6 pb-[30px] bg-neutral-50 rounded-[20px] flex-col justify-center items-center gap-[7px] inline-flex">
        <div className="self-stretch h-full flex-col justify-start items-center gap-6 flex">
          <div className="self-stretch h-full flex-col justify-start items-center gap-2.5 flex py-8">
            <div className="self-stretch text-center text-neutral-900 text-2xl font-['Pretendard'] font-extrabold leading-9">
              회원가입
            </div>
            <div className="text-center font-['Pretendard'] font-md">
              이메일과 비밀번호를 입력하세요.
            </div>
            <form onSubmit={handleSignUpSubmit}>
              <input
                required
                type="email"
                placeholder="이메일"
                id="email"
                value={signUpData.email}
                onChange={handleSignUpData}
                ref={inputRef}
                className="font-['Pretendard'] input border-2 border-neutral-300 focus:outline-none focus:border-neutral-500 my-2 px-4 py-2 rounded-md w-full"
              />
              <input
                required
                type="password"
                placeholder="비밀번호"
                id="password"
                value={signUpData.password}
                onChange={handleSignUpData}
                className="font-['Pretendard'] input border-2 border-neutral-300 focus:outline-none focus:border-neutral-500 my-2 px-4 py-2 rounded-md w-full"
              />
              <button
                type="submit"
                className="bg-black text-white font-['Pretendard'] my-2 px-4 py-2 rounded-md w-full"
              >
                회원가입하기
              </button>
            </form>
            <div className="text-center font-['Pretendard'] text-gray-700">
              or
            </div>
            <button
              className="w-full my-2 h-11 bg-white border-2 border-neutral-200 rounded-lg flex justify-center items-center gap-2.5"
              onClick={handleGoogleLogin}
            >
              <img className="w-8 h-8" alt="Google" src={Google} />
              <div className="justify-center items-center gap-2.5 flex">
                <div className="w-full text-center text-neutral-900 text-base font-medium font-['Pretendard'] leading-normal">
                  구글로 시작하기
                </div>
              </div>
            </button>
            <div className="text-center font-['Pretendard'] text-gray-700">
              이미 계정이 있으신가요?
            </div>
            <button className="underline font-['Pretendard']" onClick={() => navigate('/account/login')}>
              로그인
            </button>
          </div>
        </div>
      </div>
      {errorAlertModalIsOpen && <AlertModal 
        icon={alertCircle}
        color={"#EF4444"}
        handleAlertCancel={handleErrorAlertCancel}
        text={"이미 가입되어 있는 이메일 주소입니다."}
     />}
    </div>
  );
};
export default SignUpModal;