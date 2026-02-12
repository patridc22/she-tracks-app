export default function Textarea({
  label,
  error,
  placeholder,
  value,
  onChange,
  disabled = false,
  required = false,
  rows = 4,
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
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        rows={rows}
        className={`
          px-4 py-3 rounded-button border-[1.5px] transition-all font-sans text-sm
          bg-cream resize-none leading-relaxed font-light
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
