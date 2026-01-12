import type { SVGProps } from "react";

interface TelegramIconProps extends SVGProps<SVGSVGElement> {
  className?: string;
}

export default function TelegramIcon({ className }: TelegramIconProps) {
    return (
        <svg 
        fill="currentColor" 
        viewBox="0 0 24 24"
        className={className}
        >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.69-.52.36-1 .53-1.42.52-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.42-.88.03-.24.36-.48.99-.74 3.84-1.67 6.41-2.77 7.7-3.3 3.66-1.51 4.42-1.77 4.92-1.78.11 0 .35.03.51.16.14.12.18.28.19.39.01.07.01.21 0 .33z"/>
        </svg>
    );
}