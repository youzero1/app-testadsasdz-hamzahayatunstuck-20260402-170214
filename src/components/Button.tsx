'use client'

type ButtonVariant = 'number' | 'operator' | 'function' | 'equals'

type ButtonProps = {
  label: string
  onClick: () => void
  variant?: ButtonVariant
  isActive?: boolean
  wide?: boolean
}

const variantStyles: Record<ButtonVariant, string> = {
  number:
    'bg-slate-700 hover:bg-slate-600 active:bg-slate-500 text-white shadow-md shadow-black/30',
  operator:
    'bg-indigo-500 hover:bg-indigo-400 active:bg-indigo-300 text-white shadow-md shadow-indigo-900/40',
  function:
    'bg-slate-600 hover:bg-slate-500 active:bg-slate-400 text-slate-100 shadow-md shadow-black/30',
  equals:
    'bg-gradient-to-b from-indigo-400 to-indigo-600 hover:from-indigo-300 hover:to-indigo-500 active:from-indigo-500 active:to-indigo-700 text-white shadow-lg shadow-indigo-900/50',
}

const Button = ({ label, onClick, variant = 'number', isActive = false, wide = false }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`
        ${ wide ? 'col-span-2' : '' }
        ${variantStyles[variant]}
        ${ isActive ? 'ring-2 ring-white/50 brightness-110' : '' }
        rounded-2xl
        h-16
        text-xl
        font-semibold
        transition-all
        duration-100
        select-none
        cursor-pointer
        flex
        items-center
        justify-center
        active:scale-95
      `}
    >
      {label}
    </button>
  )
}

export default Button
