interface InputProps {
    type: 'text' | 'password' | 'number';
    placeholder: string;
    value?: any;
    defaultValue?: any;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  }
  
  export default function Input(props: InputProps) {
    return (
      <input
        type={props.type}
        placeholder={props.placeholder}
        onChange={props.onChange}
        value={props.value}
        defaultValue={props.defaultValue}
        className="bg-darkTheme text-white outline-none p-2 w-full border border-zinc-800 rounded-md"
      />
    );
  }
  