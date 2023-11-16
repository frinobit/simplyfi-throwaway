import WelcomeCSS from "../styles/pages/Welcome.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

import Login from "../components/loginSignup/Login";
import Signup from "../components/loginSignup/Signup";

const Welcome = () => {
  const { user } = useAuthContext();
  const [showSignUp, setShowSignUp] = useState(false);

  const handleBackToLogin = () => {
    setShowSignUp(false);
  };

  return (
    <div className={WelcomeCSS.welcome}>
      <div>
        <ul className={WelcomeCSS.welcome_nav}>
          <li>
            <Link
              to="/simplyfi-throwaway"
              className={WelcomeCSS.welcome_nav_link}
            >
              <svg
                width="190"
                height="58"
                viewBox="0 0 190 58"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="29" cy="29" r="29" fill="white" fillOpacity="0.8" />
                <circle cx="28.5" cy="29.5" r="10.5" fill="#F57D20" />
                <path
                  d="M189.707 29.7071C190.098 29.3166 190.098 28.6834 189.707 28.2929L183.343 21.9289C182.953 21.5384 182.319 21.5384 181.929 21.9289C181.538 22.3195 181.538 22.9526 181.929 23.3431L187.586 29L181.929 34.6569C181.538 35.0474 181.538 35.6805 181.929 36.0711C182.319 36.4616 182.953 36.4616 183.343 36.0711L189.707 29.7071ZM29 30H189V28H29V30Z"
                  fill="#F57D20"
                />
              </svg>
            </Link>
            <span className={WelcomeCSS.welcome_link_text}>Welcome</span>
          </li>
          <li>
            <Link
              to="/simplyfi-throwaway/snapshotbasic"
              className={WelcomeCSS.welcome_nav_link}
            >
              <svg
                width="190"
                height="58"
                viewBox="0 0 190 58"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="29" cy="29" r="29" fill="white" fillOpacity="0.8" />
                <circle cx="28.5" cy="29.5" r="10.5" fill="#2DC5B8" />
                <path
                  d="M189.707 29.7071C190.098 29.3166 190.098 28.6834 189.707 28.2929L183.343 21.9289C182.953 21.5384 182.319 21.5384 181.929 21.9289C181.538 22.3195 181.538 22.9526 181.929 23.3431L187.586 29L181.929 34.6569C181.538 35.0474 181.538 35.6805 181.929 36.0711C182.319 36.4616 182.953 36.4616 183.343 36.0711L189.707 29.7071ZM29 30H189V28H29V30Z"
                  fill="#2DC5B8"
                />
              </svg>
            </Link>
            <span className={WelcomeCSS.welcome_link_text}>Snapshot</span>
          </li>
          <li>
            <Link
              to="/simplyfi-throwaway"
              className={WelcomeCSS.welcome_nav_link}
            >
              <svg
                width="190"
                height="58"
                viewBox="0 0 190 58"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="29" cy="29" r="29" fill="white" fillOpacity="0.8" />
                <circle cx="28.5" cy="29.5" r="10.5" fill="#FF3366" />
                <path
                  d="M189.707 29.7071C190.098 29.3166 190.098 28.6834 189.707 28.2929L183.343 21.9289C182.953 21.5384 182.319 21.5384 181.929 21.9289C181.538 22.3195 181.538 22.9526 181.929 23.3431L187.586 29L181.929 34.6569C181.538 35.0474 181.538 35.6805 181.929 36.0711C182.319 36.4616 182.953 36.4616 183.343 36.0711L189.707 29.7071ZM29 30H189V28H29V30Z"
                  fill="#FF3366"
                />
              </svg>
            </Link>
            <span className={WelcomeCSS.welcome_link_text}>Deep Dive</span>
          </li>
          <li>
            <Link
              to="/simplyfi-throwaway"
              className={WelcomeCSS.welcome_nav_link}
            >
              <svg
                width="190"
                height="58"
                viewBox="0 0 190 58"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="29" cy="29" r="29" fill="white" fillOpacity="0.8" />
                <circle cx="28.5" cy="29.5" r="10.5" fill="#3ABEFF" />
                <path
                  d="M189.707 29.7071C190.098 29.3166 190.098 28.6834 189.707 28.2929L183.343 21.9289C182.953 21.5384 182.319 21.5384 181.929 21.9289C181.538 22.3195 181.538 22.9526 181.929 23.3431L187.586 29L181.929 34.6569C181.538 35.0474 181.538 35.6805 181.929 36.0711C182.319 36.4616 182.953 36.4616 183.343 36.0711L189.707 29.7071ZM29 30H189V28H29V30Z"
                  fill="#3ABEFF"
                />
              </svg>
            </Link>
            <span className={WelcomeCSS.welcome_link_text}>Goals</span>
          </li>
          <li>
            <Link
              to="/simplyfi-throwaway"
              className={WelcomeCSS.welcome_nav_link}
            >
              <svg
                width="190"
                height="58"
                viewBox="0 0 190 58"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="29" cy="29" r="29" fill="white" fillOpacity="0.8" />
                <circle cx="28.5" cy="29.5" r="10.5" fill="#F9C710" />
                <path
                  d="M189.707 29.7071C190.098 29.3166 190.098 28.6834 189.707 28.2929L183.343 21.9289C182.953 21.5384 182.319 21.5384 181.929 21.9289C181.538 22.3195 181.538 22.9526 181.929 23.3431L187.586 29L181.929 34.6569C181.538 35.0474 181.538 35.6805 181.929 36.0711C182.319 36.4616 182.953 36.4616 183.343 36.0711L189.707 29.7071ZM29 30H189V28H29V30Z"
                  fill="#F9C710"
                />
              </svg>
            </Link>
            <span className={WelcomeCSS.welcome_link_text}>Loved Ones</span>
          </li>
          <li>
            <Link
              to="/simplyfi-throwaway"
              className={WelcomeCSS.welcome_nav_link}
            >
              <svg
                width="189"
                height="58"
                viewBox="0 0 189 58"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="29" cy="29" r="29" fill="white" fillOpacity="0.8" />
                <circle cx="28.5" cy="29.5" r="10.5" fill="black" />
              </svg>
            </Link>
            <span className={WelcomeCSS.welcome_link_text}>
              Risk & Investment
            </span>
          </li>
        </ul>
      </div>

      {!user && !showSignUp && (
        <Login onSignUpClick={() => setShowSignUp(true)} />
      )}

      {!user && showSignUp && <Signup onBackToLoginClick={handleBackToLogin} />}
    </div>
  );
};

export default Welcome;
