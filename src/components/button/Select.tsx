interface SelectProps {
    placeholder: string;
    value?: any;
    children: React.ReactNode;
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    defaultValue?: any;
  }
  
  export default function Select(props: SelectProps) {
    return (
      <select
        placeholder={props.placeholder}
        onChange={props.onChange}
        value={props.value}
        defaultValue={props.defaultValue}
        className="bg-darkTheme text-white outline-none p-2 w-full border border-zinc-800 rounded-md"
      >
        {props.children}
      </select>
    );
  }
  