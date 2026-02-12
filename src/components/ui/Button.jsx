const variants = {
  primary: 'bg-gradient-to-br from-rose to-mauve text-white hover:shadow-rose-hover shadow-rose-glow',
  secondary: 'bg-transparent text-rose border-[1.5px] border-rose/40 hover:bg-rose/10',
  ghost: 'bg-rose/10 text-rose hover:bg-rose/20',
  danger: 'bg-red-500 text-white hover:bg-red-600',
};

const sizes = {
  sm: 'px-4 py-2 text-xs rounded-xl',
  md: 'px-7 py-3.5 text-sm rounded-button',
  lg: 'px-8 py-4 text-base rounded-button',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  type = 'button',
  className = '',
  ...props
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        font-medium font-sans transition-all tracking-wide
        ${variants[variant]}
        ${sizes[size]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'active:scale-[0.98] hover:-translate-y-0.5'}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
