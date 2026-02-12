const variants = {
  rose: 'bg-rose/12 text-rose',
  sage: 'bg-sage/14 text-sage',
  mauve: 'bg-mauve/12 text-mauve',
  ai: 'bg-gradient-to-br from-rose to-mauve text-white uppercase tracking-widest text-[10px] font-bold',
  neutral: 'bg-deep/6 text-muted',
};

export default function Badge({ children, variant = 'rose', className = '', ...props }) {
  return (
    <span
      className={`
        inline-flex items-center gap-1.5 px-3 py-1 rounded-full
        text-[11px] font-medium tracking-wide
        ${variants[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </span>
  );
}
