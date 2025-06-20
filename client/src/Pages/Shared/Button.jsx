

const Button = ({ color, onClick, text }) => {
  const getColorClasses = () => {
    switch (color) {
      case "blue":
        return "bg-blue-700 hover:bg-blue-700";
      case "cyan":
        return "bg-cyan-700 hover:bg-blue-700";
      case "green":
        return "bg-green-700 hover:bg-green-700";
      case "red":
        return "bg-red-700 hover:bg-red-700";
      case "orange":
        return "bg-orange-700 hover:bg-red-700";
   
      default:
        return "bg-gray-500 hover:bg-gray-700";
    }
  };

  return (
    <button
      className={`text-white font-bold py-2 px-4 rounded-lg ${getColorClasses()}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
