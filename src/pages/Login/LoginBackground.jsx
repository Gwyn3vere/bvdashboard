// Libraries
import classNames from "classnames/bind";
// Styles - UI - Icons -Images
import style from "../../styles/pages.module.css";
import { images } from "../../assets/images";

const cx = classNames.bind(style);

function LoginBackground() {
  return (
    <div>
      <img src={images.doctor1} alt="background" className="sm:w-[400px] md:w-[500px] 2xl:w-[700px]" />
    </div>
  );
}

export default LoginBackground;
