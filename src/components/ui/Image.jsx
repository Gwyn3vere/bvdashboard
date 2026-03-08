import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "../../styles/ui.module.css";

const cx = classNames.bind(styles);

function Image({ src, alt, className, width, height, styles = {} }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={cx("relative w-full overflow-hidden", className)} style={{ width, height, ...styles }}>
      {!loaded && <div className="absolute inset-0 animate-pulse bg-gray-200" />}

      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        className={`w-full h-full object-cover transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}

export default React.memo(Image);
