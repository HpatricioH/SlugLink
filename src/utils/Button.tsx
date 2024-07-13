'use client'

interface ButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>
  type?: 'submit' | 'button' | 'reset'
  disabled?: boolean
}

export default function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={`${className} btn btn-outline`}
    >
      {children}
    </button>
  )
}