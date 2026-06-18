export const Input = ({
  label,
  error,
  prefix,
  suffix,
  className = '',
  ...props
}) => (
  <div className={`flex flex-col gap-1.5 ${className}`}>
    {label && (
      <label className="text-sm font-medium text-gray-700">{label}</label>
    )}
    <div className="relative flex items-center">
      {prefix && (
        <span className="absolute left-3 text-gray-500 text-sm">{prefix}</span>
      )}
      <input
        className={`
          w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none
          transition-all duration-200
          placeholder:text-gray-400
          focus:ring-2 focus:ring-[#00C2A8]/20 focus:border-[#00C2A8]
          disabled:bg-gray-50 disabled:text-gray-400
          ${error ? 'border-red-400 focus:ring-red-100 focus:border-red-400' : 'border-gray-200'}
          ${prefix ? 'pl-9' : ''}
          ${suffix ? 'pr-9' : ''}
        `}
        {...props}
      />
      {suffix && (
        <span className="absolute right-3 text-gray-500 text-sm">{suffix}</span>
      )}
    </div>
    {error && <p className="text-xs text-red-500">{error}</p>}
  </div>
);

export const Select = ({ label, error, children, className = '', ...props }) => (
  <div className={`flex flex-col gap-1.5 ${className}`}>
    {label && (
      <label className="text-sm font-medium text-gray-700">{label}</label>
    )}
    <select
      className={`
        w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none
        transition-all duration-200
        focus:ring-2 focus:ring-[#00C2A8]/20 focus:border-[#00C2A8]
        ${error ? 'border-red-400' : 'border-gray-200'}
      `}
      {...props}
    >
      {children}
    </select>
    {error && <p className="text-xs text-red-500">{error}</p>}
  </div>
);

export const Textarea = ({ label, error, className = '', ...props }) => (
  <div className={`flex flex-col gap-1.5 ${className}`}>
    {label && (
      <label className="text-sm font-medium text-gray-700">{label}</label>
    )}
    <textarea
      className={`
        w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none
        transition-all duration-200 resize-none
        placeholder:text-gray-400
        focus:ring-2 focus:ring-[#00C2A8]/20 focus:border-[#00C2A8]
        ${error ? 'border-red-400' : 'border-gray-200'}
      `}
      rows={3}
      {...props}
    />
    {error && <p className="text-xs text-red-500">{error}</p>}
  </div>
);