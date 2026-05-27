import { LoginForm } from "@/components/admin/LoginForm";
import { getAdminSecrets } from "@/lib/admin-session";
import Link from "next/link";

export default function AdminLoginPage() {
  const { password, sessionSecret } = getAdminSecrets();
  const isConfigured = Boolean(password && sessionSecret);

  return (
    <div className="mx-auto max-w-md">
      <h1 className="text-center font-serif text-3xl font-semibold text-dusty-dark">
        Admin Login
      </h1>
      <p className="mt-2 text-center text-sm text-ink-muted">
        Sign in to view RSVP responses
      </p>

      <div className="mt-8 rounded-2xl bg-cream p-6 shadow-sm md:p-8">
        {!isConfigured ? (
          <p className="text-center text-sm text-ink-muted">
            Admin is not configured. Add{" "}
            <code className="rounded bg-beige px-1">ADMIN_PASSWORD</code> and{" "}
            <code className="rounded bg-beige px-1">ADMIN_SESSION_SECRET</code> to{" "}
            <code className="rounded bg-beige px-1">.env.local</code>, then restart
            the dev server.
          </p>
        ) : (
          <LoginForm />
        )}
      </div>

      <p className="mt-6 text-center text-sm text-ink-muted">
        <Link href="/" className="text-dusty-dark underline-offset-2 hover:underline">
          Back to invitation
        </Link>
      </p>
    </div>
  );
}
