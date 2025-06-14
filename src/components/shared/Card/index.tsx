import { motion } from "framer-motion";

interface Props {
    icon: any;
    title: string;
    description: string;
}

const Card = (props: Props) => {
    const { icon: Icon, title, description } = props;

    return (
        <motion.div
            className="bg-gradient-to-br from-sage-100 to-cream-100 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            whileHover={{ scale: 1.05 }}
        >
            {Icon && <Icon className="text-teal-600 w-12 h-12 mb-4 mx-auto mt-6" />}
            <div className="p-6">
                <h3 className="text-2xl font-semibold text-teal-800 text-center">{title}</h3>
                <p className="text-gray-700 mt-2 text-center">{description}</p>
            </div>
        </motion.div>
    );
};

export default Card;
