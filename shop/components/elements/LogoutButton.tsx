export default function LogoutButton() {
  return (
    <button
      onClick={async () => {
        await fetch("/api/logout", { method: "POST" });
        window.location.href = "/shop";
      }}
    >
      Wyloguj
    </button>
  );
}
