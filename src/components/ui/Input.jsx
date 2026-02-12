export default function Input({
  label,
  error,
  type = 'text',
  placeholder,
  value,
  onChange,
  disabled = false,
  required = false,
  className = '',
  ...props
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label className="text-xs font-medium text-muted uppercase tracking-wide">
          {label}
          {required && <span className="text-rose ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        className={`
          px-4 py-3 rounded-button border-[1.5px] transition-all font-sans text-sm
          bg-warm-white shadow-sm
          ${error
            ? 'border-rose/50 focus:border-rose focus:ring-2 focus:ring-rose/20'
            : 'border-deep/10 focus:border-rose focus:ring-2 focus:ring-rose/20'
          }
          ${disabled ? 'bg-deep/5 cursor-not-allowed opacity-60' : ''}
          focus:outline-none placeholder:text-muted/50
        `}
        {...props}
      />
      {error && (
        <span className="text-xs text-rose font-medium">⚠ {error}</span>
      )}
    </div>
  );
}
