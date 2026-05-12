interface InputProps extends React.ComponentPropsWithoutRef<"input"> {
  label?: string;
  placeholder: string;
  required?: boolean;
  icon?: React.ReactElement;
  error?: string;
  className?: string;
}

export default function Input({ type, label, placeholder, required = true, icon, error, className = "", ...props }: InputProps) {
  return (
    <div className={className}>
      {label && (
        <label className="block mb-2 text-body font-semibold">
          {label} {required && <span className="text-red-600">*</span>}
        </label>
      )}
      <div
        className={`flex inset-ring rounded-lg focus-within:inset-ring-2 ${error ? "inset-ring-red-500 focus-within:inset-ring-red-500" : "inset-ring-neutral-300 focus-within:inset-ring-black"} ${props.disabled ? "cursor-not-allowed bg-neutral-100 text-neutral-500" : "bg-white"}`}
      >
        {icon && (
          <div className="flex items-center">
            <div className="size-12 grid place-content-center">{icon}</div>
            <div className="w-px h-6 bg-neutral-300 rounded-2xl"></div>
          </div>
        )}
        <input type={type} placeholder={placeholder} className="grow focus:outline-0 p-3 text-body disabled:cursor-not-allowed" {...props} />
      </div>
      {error && <p className="mt-1 text-caption text-red-500">{error}</p>}
    </div>
  );
}
