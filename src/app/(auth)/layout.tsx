// The AuthShell now provides the page chrome (header, background, footer),
// so this group layout is a simple pass-through.
export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
