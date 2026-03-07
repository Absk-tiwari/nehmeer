const Button = ({ text }) => {
  return (
    <button
      style={{
        width: "100%",
        padding: "14px",
        background: "#000",
        color: "#fff",
        borderRadius: "10px",
        border: "none",
        fontSize: "16px",
      }}
    >
      {text}
    </button>
  );
};

export default Button;
