export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-sand px-4 py-8 md:px-6 md:py-12">
      <div className="mx-auto max-w-6xl">{children}</div>
    </div>
  );
}
