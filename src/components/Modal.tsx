import { useEffect, useRef } from "react";

interface ModalProps {
    title: string;
    onClose: () => void;
    children: React.ReactNode;
}

export function Modal({ title, onClose, children }: ModalProps) {
    const dialogRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const previousFocus = document.activeElement as HTMLElement | null;

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };

        window.addEventListener("keydown", onKeyDown);

        const firstFocusable = dialogRef.current?.querySelector<HTMLElement>(
            "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
        );
        firstFocusable?.focus();

        return () => {
            window.removeEventListener("keydown", onKeyDown);
            previousFocus?.focus();
        };
    }, [onClose]);

    return (
        <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.4)" }}>
            <div
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-label={title}
                onClick={(e) => e.stopPropagation()}
                style={{ maxWidth: 420, margin: "10vh auto", background: "#fff", padding: 16 }}
            >
                {children}
            </div>
        </div>
    );
}
