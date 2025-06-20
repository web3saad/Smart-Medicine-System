
import { Button } from './Button';

type CardPropsType={
  title:string,
  description:string,
  image:string
}

const Card:React.FC<CardPropsType> = ({title,description,image}) => {
  return (
    <div className="max-w-md mx-auto bg-white overflow-hidden sm:rounded-lg rounded-lg shadow-lg">
      <div className="px-4 py-5 sm:px-6 ">
           <img width="500" height="500" className="w-full rounded-lg h-48 object-cover" src={image} alt="Placeholder image" />

        <h3 className="text-lg font-bold leading-6 text-cyan-800 capitalize mt-5">{title}</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500 capitalize">{description}</p>
      </div>
      <div className="border-t border-gray-200 px-4 py-4 sm:px-6">
        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
          <div className="sm:col-span-1">
            <Button className='bg-sky-600 text-bold'>Click Card </Button>
          </div>
       
        </dl>
      </div>
    </div>
  );
};

export default Card;
