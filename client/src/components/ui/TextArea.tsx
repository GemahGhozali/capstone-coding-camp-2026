interface TextAreaProps extends React.ComponentPropsWithoutRef<"textarea"> {
  label?: string;
  placeholder: string;
  required?: boolean;
  error?: string;
  className?: string;
}

export default function TextArea({ label, placeholder, required = true, error, className = "", rows = 4, ...props }: TextAreaProps) {
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
        <textarea placeholder={placeholder} rows={rows} className="grow focus:outline-0 p-3 text-body disabled:cursor-not-allowed resize-none" {...props} />
      </div>
      {error && <p className="mt-1 text-caption text-red-500">{error}</p>}
    </div>
  );
}
