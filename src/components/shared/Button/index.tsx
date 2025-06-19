import cs from "classnames";
import { motion } from "framer-motion";

interface Props {
  text: string;
  onClick: () => void;
  variant?: "primary" | "secondary" | "tertiary" | "quaternary" | "danger";
  size?: "default" | "small";
  type?: "button" | "submit" | "reset";
}

const Button = (props: Props) => {
  const { text, onClick, variant = "primary", size = "default", type = "button" } = props;

  const buttonStyles = {
    primary: "bg-emerald-700 hover:bg-emerald-800 text-white",
    secondary: "bg-slate-600 hover:bg-slate-700 text-white",
    tertiary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
    quaternary: "bg-olive-500 hover:bg-olive-600 text-white",
    danger: "bg-rose-600 hover:bg-rose-700 text-white",
  };

  const sizeStyles = {
    default: "px-6 py-3 text-base",
    small: "px-3 py-2 text-sm",
  };

  return (
    <motion.button
      type={type}
      className={cs(
        "rounded-full font-serif font-medium shadow-md transition-all",
        buttonStyles[variant],
        sizeStyles[size]
      )}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {text}
    </motion.button>
  );
};

export default Button;
