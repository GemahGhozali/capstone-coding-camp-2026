export default function ProfileIcon({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M8 7.99998C9.10457 7.99998 10 7.10455 10 5.99998C10 4.89542 9.10457 3.99998 8 3.99998C6.89543 3.99998 6 4.89542 6 5.99998C6 7.10455 6.89543 7.99998 8 7.99998Z"
        stroke="currentColor"
      />
      <path
        d="M8 14.6667C11.6819 14.6667 14.6667 11.6819 14.6667 7.99999C14.6667 4.3181 11.6819 1.33333 8 1.33333C4.3181 1.33333 1.33334 4.3181 1.33334 7.99999C1.33334 11.6819 4.3181 14.6667 8 14.6667Z"
        stroke="currentColor"
      />
      <path
        d="M11.98 13.3333C11.8733 11.4053 11.2833 9.99998 8 9.99998C4.71666 9.99998 4.12666 11.4053 4.02 13.3333"
        stroke="currentColor"
        strokeLinecap="round"
      />
    </svg>
  );
}
