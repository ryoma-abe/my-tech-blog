import PrivateHeader from "@/components/layouts/PrivateHeader";

export default function PrivateLayoutRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <PrivateHeader />
      {children}
    </main>
  );
}
