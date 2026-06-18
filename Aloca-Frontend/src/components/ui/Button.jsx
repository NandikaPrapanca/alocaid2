const variants = {
  primary: 'bg-[#00C2A8] hover:bg-[#009F8A] text-white',
  secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-700',
  danger: 'bg-red-500 hover:bg-red-600 text-white',
  outline: 'border border-[#00C2A8] text-[#00C2A8] hover:bg-[#00C2A8] hover:text-white',
  ghost: 'text-gray-600 hover:bg-gray-100',
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
  full: 'w-full px-4 py-3 text-base',
};

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  ...props
}) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled || loading}
    className={`
      inline-flex items-center justify-center gap-2 font-medium rounded-xl
      transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
      ${variants[variant]}
      ${sizes[size]}
      ${className}
    `}
    {...props}
  >
    {loading ? (
      <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
    ) : null}
    {children}
  </button>
);