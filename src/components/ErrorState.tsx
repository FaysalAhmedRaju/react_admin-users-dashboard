interface Props {
    message: string;
    onRetry: () => void;
}

export function ErrorState({ message, onRetry }: Props) {
    return (
        <div role="alert">
            <p>{message}</p>
            <button onClick={onRetry}>Retry</button>
        </div>
    );
}
