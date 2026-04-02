'use client'

import { useState, useCallback } from 'react'
import Display from './Display'
import Button from './Button'

type Operation = '+' | '-' | '*' | '/' | null

const Calculator = () => {
  const [displayValue, setDisplayValue] = useState<string>('0')
  const [previousValue, setPreviousValue] = useState<string | null>(null)
  const [operation, setOperation] = useState<Operation>(null)
  const [waitingForOperand, setWaitingForOperand] = useState<boolean>(false)
  const [expression, setExpression] = useState<string>('')
  const [hasError, setHasError] = useState<boolean>(false)

  const inputDigit = useCallback(
    (digit: string) => {
      if (hasError) return
      if (waitingForOperand) {
        setDisplayValue(digit)
        setWaitingForOperand(false)
      } else {
        setDisplayValue(displayValue === '0' ? digit : displayValue + digit)
      }
    },
    [displayValue, waitingForOperand, hasError]
  )

  const inputDecimal = useCallback(() => {
    if (hasError) return
    if (waitingForOperand) {
      setDisplayValue('0.')
      setWaitingForOperand(false)
      return
    }
    if (!displayValue.includes('.')) {
      setDisplayValue(displayValue + '.')
    }
  }, [displayValue, waitingForOperand, hasError])

  const handleOperation = useCallback(
    (nextOperation: Operation) => {
      if (hasError) return
      const inputValue = parseFloat(displayValue)

      if (previousValue !== null && !waitingForOperand) {
        const prevValue = parseFloat(previousValue)
        let result: number

        switch (operation) {
          case '+':
            result = prevValue + inputValue
            break
          case '-':
            result = prevValue - inputValue
            break
          case '*':
            result = prevValue * inputValue
            break
          case '/':
            if (inputValue === 0) {
              setDisplayValue('Error')
              setHasError(true)
              setExpression('')
              setPreviousValue(null)
              setOperation(null)
              setWaitingForOperand(false)
              return
            }
            result = prevValue / inputValue
            break
          default:
            result = inputValue
        }

        const resultStr = parseFloat(result.toPrecision(12)).toString()
        setDisplayValue(resultStr)
        setPreviousValue(resultStr)
        setExpression(resultStr + ' ' + (nextOperation ?? ''))
      } else {
        setPreviousValue(displayValue)
        setExpression(displayValue + ' ' + (nextOperation ?? ''))
      }

      setWaitingForOperand(true)
      setOperation(nextOperation)
    },
    [displayValue, previousValue, operation, waitingForOperand, hasError]
  )

  const handleEquals = useCallback(() => {
    if (hasError || previousValue === null || operation === null) return

    const inputValue = parseFloat(displayValue)
    const prevValue = parseFloat(previousValue)
    let result: number

    switch (operation) {
      case '+':
        result = prevValue + inputValue
        break
      case '-':
        result = prevValue - inputValue
        break
      case '*':
        result = prevValue * inputValue
        break
      case '/':
        if (inputValue === 0) {
          setDisplayValue('Error')
          setHasError(true)
          setExpression('')
          setPreviousValue(null)
          setOperation(null)
          setWaitingForOperand(false)
          return
        }
        result = prevValue / inputValue
        break
      default:
        return
    }

    const resultStr = parseFloat(result.toPrecision(12)).toString()
    setExpression(previousValue + ' ' + operation + ' ' + displayValue + ' =')
    setDisplayValue(resultStr)
    setPreviousValue(null)
    setOperation(null)
    setWaitingForOperand(true)
  }, [displayValue, previousValue, operation, hasError])

  const handleClear = useCallback(() => {
    setDisplayValue('0')
    setPreviousValue(null)
    setOperation(null)
    setWaitingForOperand(false)
    setExpression('')
    setHasError(false)
  }, [])

  const handleToggleSign = useCallback(() => {
    if (hasError) return
    if (displayValue !== '0') {
      setDisplayValue(
        displayValue.startsWith('-')
          ? displayValue.slice(1)
          : '-' + displayValue
      )
    }
  }, [displayValue, hasError])

  const handlePercentage = useCallback(() => {
    if (hasError) return
    const value = parseFloat(displayValue)
    const result = value / 100
    setDisplayValue(parseFloat(result.toPrecision(12)).toString())
  }, [displayValue, hasError])

  const handleBackspace = useCallback(() => {
    if (hasError) {
      handleClear()
      return
    }
    if (waitingForOperand) return
    if (displayValue.length > 1) {
      setDisplayValue(displayValue.slice(0, -1))
    } else {
      setDisplayValue('0')
    }
  }, [displayValue, waitingForOperand, hasError, handleClear])

  const operatorSymbol = (op: string) => {
    switch (op) {
      case '*': return '×'
      case '/': return '÷'
      default: return op
    }
  }

  return (
    <div className="flex flex-col items-center">
      <div className="mb-6 text-center">
        <div className="flex items-center justify-center gap-3 mb-2">
          <img src="/calculator-icon.svg" alt="Calculator" className="w-10 h-10" />
          <h1 className="text-3xl font-bold text-white tracking-wide">Calculator</h1>
        </div>
        <p className="text-slate-400 text-sm">Built with Next.js & Tailwind CSS</p>
      </div>

      <div className="bg-slate-900 rounded-3xl shadow-2xl shadow-black/50 p-5 w-80 border border-slate-700/50">
        <Display
          value={displayValue}
          expression={expression}
          operation={operation ? operatorSymbol(operation) : null}
          hasError={hasError}
        />

        <div className="grid grid-cols-4 gap-3 mt-4">
          {/* Row 1 */}
          <Button label="AC" onClick={handleClear} variant="function" />
          <Button label="+/-" onClick={handleToggleSign} variant="function" />
          <Button label="%" onClick={handlePercentage} variant="function" />
          <Button label="÷" onClick={() => handleOperation('/')} variant="operator" isActive={operation === '/'} />

          {/* Row 2 */}
          <Button label="7" onClick={() => inputDigit('7')} variant="number" />
          <Button label="8" onClick={() => inputDigit('8')} variant="number" />
          <Button label="9" onClick={() => inputDigit('9')} variant="number" />
          <Button label="×" onClick={() => handleOperation('*')} variant="operator" isActive={operation === '*'} />

          {/* Row 3 */}
          <Button label="4" onClick={() => inputDigit('4')} variant="number" />
          <Button label="5" onClick={() => inputDigit('5')} variant="number" />
          <Button label="6" onClick={() => inputDigit('6')} variant="number" />
          <Button label="-" onClick={() => handleOperation('-')} variant="operator" isActive={operation === '-'} />

          {/* Row 4 */}
          <Button label="1" onClick={() => inputDigit('1')} variant="number" />
          <Button label="2" onClick={() => inputDigit('2')} variant="number" />
          <Button label="3" onClick={() => inputDigit('3')} variant="number" />
          <Button label="+" onClick={() => handleOperation('+')} variant="operator" isActive={operation === '+'} />

          {/* Row 5 */}
          <Button label="⌫" onClick={handleBackspace} variant="number" />
          <Button label="0" onClick={() => inputDigit('0')} variant="number" />
          <Button label="." onClick={inputDecimal} variant="number" />
          <Button label="=" onClick={handleEquals} variant="equals" />
        </div>
      </div>

      <p className="mt-6 text-slate-500 text-xs">© {new Date().getFullYear()} Calculator App</p>
    </div>
  )
}

export default Calculator
