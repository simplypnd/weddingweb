import { ContentConfigProvider } from "@/components/admin/ContentConfigProvider";
import { ContentEditorShell } from "@/components/admin/ContentEditorShell";

export default function AdminContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ContentConfigProvider>
      <ContentEditorShell>{children}</ContentEditorShell>
    </ContentConfigProvider>
  );
}
