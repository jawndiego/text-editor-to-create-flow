import React from 'react';

type CreateButtonProps = {
  onClick: () => void;
};

const CreateButton: React.FC<CreateButtonProps> = ({ onClick }) => (
  <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded justify-center" onClick={onClick}>
    create
  </button>
);

export default CreateButton;