'use client'

interface ButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  type?: 'submit' | 'button' | 'reset'
  disabled?: boolean
}

export default function ButtonError({ children, className, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={`${className} btn btn-error`}
    >
      {children}
    </button>
  )
}