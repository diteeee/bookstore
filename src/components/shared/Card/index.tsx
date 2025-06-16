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
      className="relative bg-gray-50 border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
      whileHover={{ scale: 1.03 }}
    >
      {/* Decorative Strip */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-700 via-olive-500 to-gray-400"></div>

      {/* Content */}
      <div className="p-6 flex flex-col items-center">
        {Icon && (
          <div className="bg-olive-100 p-3 rounded-full mb-4">
            <Icon className="text-olive-600 w-8 h-8" />
          </div>
        )}
        <h3 className="text-lg font-serif font-semibold text-gray-800 text-center mb-2">
          {title}
        </h3>
        <p className="text-gray-600 text-sm text-center">{description}</p>
      </div>
    </motion.div>
  );
};

export default Card;
