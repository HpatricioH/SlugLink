'use client'

interface ButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  type?: 'submit' | 'button' | 'reset'
}

export default function Button ({ children, className, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={className}
    >
      {children}
    </button>
  )
}