function Button({ height = 40, width = 100, background = "", className = "", style = {}, children, icon, ...props }) {
  return (
    <button
      className={`rounded-[8px] outline-none flex items-center justify-center ${className}`}
      style={{ height, width, background, ...style }}
      {...props}
    >
      <span>{icon}</span>
      {children}
    </button>
  );
}

export default Button;
