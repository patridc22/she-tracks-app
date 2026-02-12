const variants = {
  default: 'bg-warm-white shadow-card',
  gradient: 'bg-gradient-to-br from-rose to-mauve text-white relative overflow-hidden',
  bordered: 'bg-warm-white border-2 border-rose/25',
  soft: 'bg-blush/20 border border-rose/12',
};

export default function Card({
  children,
  variant = 'default',
  className = '',
  onClick,
  ...props
}) {
  const Component = onClick ? 'button' : 'div';

  return (
    <Component
      onClick={onClick}
      className={`
        rounded-card p-5
        ${variants[variant]}
        ${onClick ? 'cursor-pointer hover:shadow-lg transition-all' : ''}
        ${className}
      `}
      {...props}
    >
      {variant === 'gradient' && (
        <div className="absolute -top-5 -right-5 w-20 h-20 rounded-full bg-white/10 pointer-events-none" />
      )}
      {children}
    </Component>
  );
}
