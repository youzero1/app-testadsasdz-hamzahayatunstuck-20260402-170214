'use client'

type DisplayProps = {
  value: string
  expression: string
  operation: string | null
  hasError: boolean
}

const Display = ({ value, expression, hasError }: DisplayProps) => {
  const getFontSize = (val: string) => {
    if (val.length > 14) return 'text-xl'
    if (val.length > 10) return 'text-2xl'
    if (val.length > 7) return 'text-3xl'
    return 'text-4xl'
  }

  return (
    <div className="bg-slate-800/60 rounded-2xl p-4 mb-1 border border-slate-700/30">
      <div className="h-6 flex items-center justify-end">
        <span className="text-slate-400 text-sm font-light tracking-wider truncate">
          {expression || '\u00A0'}
        </span>
      </div>
      <div className="flex items-end justify-end mt-1 min-h-[56px]">
        <span
          className={`font-semibold tracking-tight transition-all duration-150 ${
            hasError
              ? 'text-red-400 text-3xl'
              : `text-white ${getFontSize(value)}`
          }`}
        >
          {value}
        </span>
      </div>
    </div>
  )
}

export default Display
