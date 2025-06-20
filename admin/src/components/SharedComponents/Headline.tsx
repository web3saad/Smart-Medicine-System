interface HeadlineProps {
  children?: string;
}

const Headline: React.FC<HeadlineProps> = ({ children }) => {
  return (
    <div className=" py-4 px-5  text-center flex justify-between mx-5">
      <h1 className="text-3xl font-bold text-cyan-700">{children}</h1>
    </div>
  );
};

export default Headline;
