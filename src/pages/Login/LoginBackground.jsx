// Libraries - Motions
import classNames from "classnames/bind";
import { FloatingIconGroup } from "../../motions";
// Styles - UI - Icons -Images
import style from "../../styles/pages.module.css";
import { images } from "../../assets/images";
import { vectors } from "../../assets/vectors";

const cx = classNames.bind(style);

function LoginBackground() {
  return (
    <div className="">
      <img src={images.doctor1} alt="background" className="sm:w-[400px] md:w-[500px] 2xl:w-[700px]" />
      <div className="absolute w-full h-full inset-0">
        <FloatingIconGroup
          icons={[
            vectors.vector1,
            vectors.vector2,
            vectors.vector3,
            vectors.vector4,
            vectors.vector5,
            vectors.vector6,
            vectors.vector7,
            vectors.vector8,
            vectors.vector9,
            vectors.vector10,
            vectors.vector11
          ]}
        />
      </div>
    </div>
  );
}

export default LoginBackground;
