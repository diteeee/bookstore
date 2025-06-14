import cs from "classnames";
import { motion } from "framer-motion";

interface Props {
  text: string;
  onClick: () => void;
  variant?: "primary" | "secondary" | "tertiary" | "quaternary";
  type?: "button" | "submit" | "reset";
}

const Button = (props: Props) => {
  const { text, onClick, variant = "primary", type = "button" } = props;
  const buttonStyles = {
    primary: "bg-amber-600 hover:bg-amber-700 text-white", // Warm amber for primary
    secondary: "bg-brown-800 hover:bg-brown-900 text-white", // Rich brown for secondary
    tertiary: "bg-gray-200 hover:bg-gray-300 text-gray-800", // Neutral for tertiary
    quaternary: "bg-olive-400 hover:bg-olive-500 text-gray-800", // Soft green for quaternary
  };

  return (
    <motion.button
      type={type}
      className={cs(
        "px-6 py-3 rounded-full font-serif font-medium shadow-md transition-all",
        buttonStyles[variant]
      )}
      onClick={onClick}
      whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 235, 205, 0.9)" }} // Subtle hover color effect
      whileTap={{ scale: 0.95 }}
    >
      {text}
    </motion.button>
  );
};

export default Button;
