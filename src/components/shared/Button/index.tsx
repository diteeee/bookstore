import cs from "classnames";
import { motion } from "framer-motion";

interface Props{
    text: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary' | 'tertiary' | 'quaternary';
    type?: 'button' | 'submit' | 'reset';
}

const Button = (props: Props) => {
    const { text, onClick, variant = "primary", type="button" } = props;
    const buttonStyles = {
        primary: "bg-teal-600 hover:bg-teal-700 text-white",
        secondary: "bg-gray-800 hover:bg-gray-900 text-white",
        tertiary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
        quaternary: "bg-gray-300 hover:bg-gray-400 text-gray-800",
    };

    return (
        <motion.button
            type={type}
            className={cs(
                "px-6 py-3 rounded-full font-medium transition-all",
                buttonStyles[variant]
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