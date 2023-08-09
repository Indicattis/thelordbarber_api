import classNames from "classnames";

type Props = {
  variant?: 'primary' | 'white' | 'light' | 'red' | 'green' | 'default' | 'blue';
  children: React.ReactNode;
  onClick?: () => void
  modalId?: string
  disabled?: boolean
  type?: 'submit' | 'button'
}

export default function Button({ variant, children, onClick, modalId, disabled, type }: Props) {
  let bgColor = ''
  if (variant == 'white') bgColor = 'active:bg-onActive hover:bg-onHover shadow-none text-white';
  if (variant == 'primary') bgColor = 'bg-yellow-600 active:bg-yellow-500 hover:bg-yellow-700 shadow-black';
  if (variant == 'red') bgColor = 'hover:bg-red-600 text-white bg-red-500';
  if (variant == 'green') bgColor = 'bg-green-500 text-white hover:bg-green-600 active:bg-green-400 ';
  if (variant == 'light') bgColor = 'bg-transparent active:bg-zinc-100 text-gray-500';
  if (variant == 'default') bgColor = 'bg-transparent  text-white hover:text-zinc-500';
  if (variant == 'blue') bgColor = 'bg-blue-400 hover:bg-blue-500 active:bg-blue-400 text-gray-100';

  return (
    <button
      className={classNames(`
        transition-all items-center
        w-full
        py-1 px-2 
        rounded-sm 
        text-gray-100
        font-medium 
        flex 
        justify-center
      `, bgColor)}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
