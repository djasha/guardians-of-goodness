/**
 * Studio layout — overrides the root layout to remove site chrome.
 * The Sanity Studio gets its own full-screen layout without
 * the site header, footer, theme toggle, or paw cursor.
 */
export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
      }}
    >
      {children}
    </div>
  );
}
