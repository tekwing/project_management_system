interface type {
    content:string
}

export default function Loader({content}:type){
    return (
            <div className="flex min-h-62.5 flex-col items-center justify-center gap-4 rounded-xl bg-white">
            <div className="loader" role="status" aria-label="Loading" />

            <p
                className="animate-pulse text-sm font-medium text-indigo-600"
                aria-live="polite"
            >
                {content}
            </p>

            <style>
                {`
                .loader {
                    width: 22px;
                    aspect-ratio: 1;
                    background: #4f46e5;
                    box-shadow: 0 0 30px 8px rgb(79 70 229 / 25%);
                    transform: translateX(-65px);
                    clip-path: inset(0);
                    animation:
                    loader-move 0.8s ease-in-out infinite alternate,
                    loader-clip 1.6s ease-in-out infinite;
                }

                @keyframes loader-move {
                    to {
                    transform: translateX(65px);
                    }
                }

                @keyframes loader-clip {
                    33% {
                    clip-path: inset(0 0 0 -70px);
                    }
                    50% {
                    clip-path: inset(0);
                    }
                    83% {
                    clip-path: inset(0 -70px 0 0);
                    }
                }

                @media (prefers-reduced-motion: reduce) {
                    .loader {
                    animation: none;
                    transform: none;
                    clip-path: none;
                    }
                }
                `}
            </style>
            </div>
        );
}