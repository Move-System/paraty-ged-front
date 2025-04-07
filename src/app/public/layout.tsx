export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full max-w-[720px] mx-auto px-4">
      {children}
    </div>
  );
}