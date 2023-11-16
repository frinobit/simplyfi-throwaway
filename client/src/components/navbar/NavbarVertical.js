import VerticalCSS from "../../styles/components/NavbarVertical.module.css";
import { Link } from "react-router-dom";

const NavbarVertical = () => {
  return (
    <nav className={VerticalCSS.navbar}>
      <ul className={VerticalCSS.navbar_nav}>
        <li className={VerticalCSS.logo}>
          <Link
            to="/simplyfi-throwaway"
            className={VerticalCSS.navbar_link_logo}
          >
            <span
              className={`${VerticalCSS.link_text} ${VerticalCSS.logo_text}`}
            >
              Simplyfi
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="23"
              height="40"
              viewBox="0 0 23 40"
              fill="none"
            >
              <path
                fill="#F57D20"
                d="M7.61388 30.3569L0 26.0088V34.9467L7.61388 39.2917L23 30.3569V21.419L7.53469 12.3986V0L0 8.21267V17.071L14.908 25.8466L7.61388 30.3569Z"
              />
              <path
                fill="#331D0E"
                d="M0 26.0027L2.81104 33.5789L0 34.9558V26.0027Z"
              />
            </svg>
          </Link>
        </li>
        <li className={`${VerticalCSS.nav_item} ${VerticalCSS.nav_item1}`}>
          <Link
            to="/simplyfi-throwaway"
            className={`${VerticalCSS.nav_link} ${VerticalCSS.nav_link1}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M21 10a16.84 16.84 0 0 0-9 3.244A16.84 16.84 0 0 0 3 10v2.96a2.004 2.004 0 0 0-2 2.007v1.004c0 1.109 2 2.208 2 2.208v2.007a14.868 14.868 0 0 1 7.417 2.55A15.09 15.09 0 0 1 12 24a15.09 15.09 0 0 1 1.583-1.264A14.868 14.868 0 0 1 21 20.186v-2.208a2.004 2.004 0 0 0 2-2.007v-1.004a2.004 2.004 0 0 0-2-2.007Zm-9 11.422a16.841 16.841 0 0 0-7-2.996v-6.15a14.8 14.8 0 0 1 5.417 2.282A15.09 15.09 0 0 1 12 15.822a15.09 15.09 0 0 1 1.583-1.264A14.8 14.8 0 0 1 19 12.275v6.151a16.841 16.841 0 0 0-7 2.996ZM11 8h2v1h-2zm0-4h2v1h-2z"
              />
              <path
                fill="currentColor"
                d="M11 10h2v1h-2zM9 5a1 1 0 0 0 1-1a.983.983 0 0 0-.99-.99A.995.995 0 1 0 9 5Z"
              />
              <circle cx="15" cy="4" r="1" fill="currentColor" />
              <path
                fill="currentColor"
                d="M16 8H8a3.003 3.003 0 0 1-3-3V3a3.003 3.003 0 0 1 3-3h8a3.003 3.003 0 0 1 3 3v2a3.003 3.003 0 0 1-3 3ZM8 2a1.001 1.001 0 0 0-1 1v2a1.001 1.001 0 0 0 1 1h8a1.001 1.001 0 0 0 1-1V3a1.001 1.001 0 0 0-1-1Z"
              />
            </svg>
            <span className={VerticalCSS.link_text}>Simply Learn</span>
          </Link>
        </li>
        <li className={VerticalCSS.nav_item}>
          <Link
            to="/simplyfi-throwaway"
            className={`${VerticalCSS.nav_link} ${VerticalCSS.nav_link1}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              viewBox="0 0 26 26"
            >
              <path
                fill="currentColor"
                d="M13 0C5.925 0 0 5.08 0 11.5c0 3.03 1.359 5.748 3.5 7.781a6.733 6.733 0 0 1-1.094 1.875A16.48 16.48 0 0 1 .375 23.22A1 1 0 0 0 1 25c2.215 0 3.808-.025 5.25-.406c1.29-.342 2.399-1.058 3.531-2.063c1.03.247 2.093.469 3.219.469c7.075 0 13-5.08 13-11.5S20.075 0 13 0zm0 2c6.125 0 11 4.32 11 9.5S19.125 21 13 21c-1.089 0-2.22-.188-3.25-.469a1 1 0 0 0-.938.25c-1.125 1.079-1.954 1.582-3.062 1.875c-.51.135-1.494.103-2.188.157c.14-.158.271-.242.407-.407c.786-.96 1.503-1.975 1.719-3.125a1 1 0 0 0-.344-.937C3.249 16.614 2 14.189 2 11.5C2 6.32 6.875 2 13 2zm-1.906 3.906a1 1 0 0 0-.469.25l-1.5 1.407l1.344 1.468l1.187-1.125h2.406L15 8.97v1.469l-2.563 1.718A1 1 0 0 0 12 13v2h2v-1.438l2.563-1.718A1 1 0 0 0 17 11V8.594a1 1 0 0 0-.25-.656l-1.5-1.688a1 1 0 0 0-.75-.344h-3.188a1 1 0 0 0-.218 0zM12 16v2h2v-2h-2z"
              />
            </svg>
            <span className={VerticalCSS.link_text}>Simply Ask</span>
          </Link>
        </li>
        <li className={VerticalCSS.nav_item}>
          <Link
            to="/simplyfi-throwaway"
            className={`${VerticalCSS.nav_link} ${VerticalCSS.nav_link1}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 32 32"
            >
              <path
                fill="currentColor"
                d="M5 25a2 2 0 1 0 2 2a2.006 2.006 0 0 0-2-2zm11 0a2 2 0 1 0 2 2a2.006 2.006 0 0 0-2-2zm11 0a2 2 0 1 0 2 2a2.006 2.006 0 0 0-2-2zm1-2h-2V11a2.006 2.006 0 0 0-2-2h-2V7h2a4.012 4.012 0 0 1 4 4zM15 12h2v11h-2zM6 23H4V11a4.012 4.012 0 0 1 4-4h2v2H8a2.006 2.006 0 0 0-2 2zM16 2l-1.3 2.634l-2.906.42l2.103 2.052L13.4 10L16 8.634L18.6 10l-.497-2.894l2.103-2.049l-2.906-.423z"
              />
            </svg>
            <span className={VerticalCSS.link_text}>Simply Match</span>
          </Link>
        </li>
        <li className={VerticalCSS.nav_item}>
          <Link
            to="/simplyfi-throwaway"
            className={`${VerticalCSS.nav_link} ${VerticalCSS.nav_link1}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M20 2H10a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V5a3 3 0 0 0-3-3Zm1 10a1 1 0 0 1-1 1H10a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1Zm-3.5-4a1.49 1.49 0 0 0-1 .39a1.5 1.5 0 1 0 0 2.22a1.5 1.5 0 1 0 1-2.61ZM16 17a1 1 0 0 0-1 1v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-4h1a1 1 0 0 0 0-2H3v-1a1 1 0 0 1 1-1a1 1 0 0 0 0-2a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-1a1 1 0 0 0-1-1ZM6 18h1a1 1 0 0 0 0-2H6a1 1 0 0 0 0 2Z"
              />
            </svg>
            <span className={VerticalCSS.link_text}>Simply Transact</span>
          </Link>
        </li>
        <li className={VerticalCSS.nav_item}>
          <Link
            to="/simplyfi-throwaway"
            className={`${VerticalCSS.nav_link} ${VerticalCSS.nav_link2}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M18.72 14.76c.35-.85.54-1.76.54-2.76c0-.72-.11-1.41-.3-2.05c-.65.15-1.33.23-2.04.23A9.07 9.07 0 0 1 9.5 6.34a9.21 9.21 0 0 1-4.73 4.88c-.04.25-.04.52-.04.78A7.27 7.27 0 0 0 12 19.27c1.05 0 2.06-.23 2.97-.64c.57 1.09.83 1.63.81 1.63c-1.64.55-2.91.82-3.78.82c-2.42 0-4.73-.95-6.43-2.66a9.03 9.03 0 0 1-2.24-3.69H2v-4.55h1.09a9.09 9.09 0 0 1 15.33-4.6a8.991 8.991 0 0 1 2.47 4.6H22v4.55h-.06L18.38 18l-5.3-.6v-1.67h4.83l.81-.97m-9.45-2.99c.3 0 .59.12.8.34a1.136 1.136 0 0 1 0 1.6c-.21.21-.5.33-.8.33c-.63 0-1.14-.5-1.14-1.13c0-.63.51-1.14 1.14-1.14m5.45 0c.63 0 1.13.51 1.13 1.14c0 .63-.5 1.13-1.13 1.13c-.63 0-1.14-.5-1.14-1.13a1.14 1.14 0 0 1 1.14-1.14Z"
              />
            </svg>
            <span className={VerticalCSS.link_text}>Chat Support</span>
          </Link>
        </li>
        <li className={VerticalCSS.nav_item}>
          <Link
            to="/simplyfi-throwaway/profile"
            className={`${VerticalCSS.nav_link} ${VerticalCSS.nav_link2}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <g
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </g>
            </svg>
            <span className={VerticalCSS.link_text}>User Profile</span>
          </Link>
        </li>
        <li className={VerticalCSS.nav_item}>
          <Link
            to="/simplyfi-throwaway"
            className={`${VerticalCSS.nav_link} ${VerticalCSS.nav_link2}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M19.43 12.98c.04-.32.07-.64.07-.98c0-.34-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46a.5.5 0 0 0-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65A.488.488 0 0 0 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1a.566.566 0 0 0-.18-.03c-.17 0-.34.09-.43.25l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98c0 .33.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46a.5.5 0 0 0 .61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.06.02.12.03.18.03c.17 0 .34-.09.43-.25l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zm-1.98-1.71c.04.31.05.52.05.73c0 .21-.02.43-.05.73l-.14 1.13l.89.7l1.08.84l-.7 1.21l-1.27-.51l-1.04-.42l-.9.68c-.43.32-.84.56-1.25.73l-1.06.43l-.16 1.13l-.2 1.35h-1.4l-.19-1.35l-.16-1.13l-1.06-.43c-.43-.18-.83-.41-1.23-.71l-.91-.7l-1.06.43l-1.27.51l-.7-1.21l1.08-.84l.89-.7l-.14-1.13c-.03-.31-.05-.54-.05-.74s.02-.43.05-.73l.14-1.13l-.89-.7l-1.08-.84l.7-1.21l1.27.51l1.04.42l.9-.68c.43-.32.84-.56 1.25-.73l1.06-.43l.16-1.13l.2-1.35h1.39l.19 1.35l.16 1.13l1.06.43c.43.18.83.41 1.23.71l.91.7l1.06-.43l1.27-.51l.7 1.21l-1.07.85l-.89.7l.14 1.13zM12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4s4-1.79 4-4s-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2s2 .9 2 2s-.9 2-2 2z"
              />
            </svg>
            <span className={VerticalCSS.link_text}>Settings</span>
          </Link>
        </li>
        <li className={VerticalCSS.nav_item}>
          <Link
            to="/simplyfi-throwaway"
            className={`${VerticalCSS.nav_link} ${VerticalCSS.nav_link2}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M18 22q-1.25 0-2.125-.875T15 19q0-.175.025-.363t.075-.337l-7.05-4.1q-.425.375-.95.588T6 15q-1.25 0-2.125-.875T3 12q0-1.25.875-2.125T6 9q.575 0 1.1.213t.95.587l7.05-4.1q-.05-.15-.075-.337T15 5q0-1.25.875-2.125T18 2q1.25 0 2.125.875T21 5q0 1.25-.875 2.125T18 8q-.575 0-1.1-.212t-.95-.588L8.9 11.3q.05.15.075.338T9 12q0 .175-.025.363T8.9 12.7l7.05 4.1q.425-.375.95-.587T18 16q1.25 0 2.125.875T21 19q0 1.25-.875 2.125T18 22Zm0-16q.425 0 .713-.288T19 5q0-.425-.288-.713T18 4q-.425 0-.713.288T17 5q0 .425.288.713T18 6ZM6 13q.425 0 .713-.288T7 12q0-.425-.288-.713T6 11q-.425 0-.713.288T5 12q0 .425.288.713T6 13Zm12 7q.425 0 .713-.288T19 19q0-.425-.288-.713T18 18q-.425 0-.713.288T17 19q0 .425.288.713T18 20Zm0-15ZM6 12Zm12 7Z"
              />
            </svg>
            <span className={VerticalCSS.link_text}>Share to Friends!</span>
          </Link>
        </li>
        <li className={VerticalCSS.nav_item}>
          <Link to="/simplyfi-throwaway" className={VerticalCSS.nav_link}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4m4-5l5 5l5-5m-5 5V3"
              />
            </svg>
            <span className={VerticalCSS.link_text}>
              Download Financial Plan
            </span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavbarVertical;
