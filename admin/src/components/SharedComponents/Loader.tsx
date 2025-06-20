import React from "react";
import { BarLoader, BeatLoader, ClockLoader, HashLoader, PacmanLoader, PropagateLoader, RingLoader } from "react-spinners";
interface LoaderColorProps {
  color?: string;
  height?:string
}


export const RingLoaderComponent: React.FC<LoaderColorProps> = ({color}) => {
  return <RingLoader color={color}  />;
};


export const HashLoaderComponent: React.FC<LoaderColorProps> = ({ color }) => {
  return <HashLoader color={color} />;
};
export const PropagateLoaderComponent: React.FC<LoaderColorProps> = ({ color }) => {
  return <PropagateLoader  color={color} />;
};
export const PacmanLoaderComponent: React.FC<LoaderColorProps> = ({ color }) => {
  return <PacmanLoader  color={color} />;
};
export const ClockLoaderComponent: React.FC<LoaderColorProps> = ({ color }) => {
  return <ClockLoader  color={color} />;
};
export const BarLoaderComponent: React.FC<LoaderColorProps> = ({ color }) => {
  return <BarLoader  color={color} />;
};
export const BeatLoaderComponent: React.FC<LoaderColorProps> = ({ color }) => {
  return <BeatLoader   color={color} />;
};


// const override = {
//   display: 'block',
//   margin: '0 auto',
//   borderColor: 'red',
// };

export const OwnLoader:React.FC<LoaderColorProps> = ({ height }) => {
  return (
    <div style={{ height: height }} className='flex items-center justify-center'>
      <div className='flex items-center justify-center space-x-2 animate-bounce'>
        <div className='w-4 h-4 bg-blue-400 rounded-full'></div>
        <div className='w-4 h-4 bg-green-400 rounded-full'></div>
        <div className='w-4 h-4 bg-black rounded-full'></div>
      </div>
    </div>
  );
};



