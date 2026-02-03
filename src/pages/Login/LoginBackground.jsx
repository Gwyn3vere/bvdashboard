import classNames from "classnames/bind";
import style from "../../styles/pages.module.css";
import { vectors } from "../../assets/vectors";

const cx = classNames.bind(style);

function LoginBackground() {
  return (
    <div className="hidden xl:block">
      <img src={vectors.vertorLoginBg} alt="background" className="object-cover w-full h-full" />
    </div>
  );
}

export default LoginBackground;
