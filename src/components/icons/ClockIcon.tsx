interface ClockIconProps {
    width?: number
    height?: number
    stroke?: string
    strokeWidth?: number
    className?: string
    isHovered?: boolean
    y: number
    x: number
}

const ClockIcon: React.FC<ClockIconProps> = ({
    width = 24,
    height = 24,
    stroke = 'currentColor',
    strokeWidth = 2,
    className = '',
    isHovered = false,
    y = 0,
    x = 0,
}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            y={y}
            x={x}
            height={height}
            viewBox="0 0 24 24"
            fill="none"
            stroke={isHovered ? '#ff4444' : stroke}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`lucide lucide-clock-2 ${className}`}
            style={{
                transition: 'stroke 0.2s ease-in-out',
            }}
        >
            <path d="M5 22h14" />
            <path d="M5 2h14" />
            <path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22" />
            <path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2" />
        </svg>
    )
}

export default ClockIcon
