"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { SiteConfig } from "@/lib/site-config-schema";
import { themeCssVars } from "@/lib/theme";

type ContentConfigContextValue = {
  config: SiteConfig | null;
  setConfig: React.Dispatch<React.SetStateAction<SiteConfig | null>>;
  loading: boolean;
  saving: boolean;
  message: string;
  error: string;
  save: () => Promise<void>;
};

const ContentConfigContext = createContext<ContentConfigContextValue | null>(
  null,
);

export function useContentConfig() {
  const ctx = useContext(ContentConfigContext);
  if (!ctx) {
    throw new Error("useContentConfig must be used within ContentConfigProvider");
  }
  return ctx;
}

export function ContentConfigProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/settings");
      const body = await res.json();
      if (!res.ok) {
        setError(body.error ?? "Failed to load settings");
        return;
      }
      setConfig(body.config);
    } catch {
      setError("Failed to load settings");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const save = useCallback(async () => {
    if (!config) return;
    setSaving(true);
    setMessage("");
    setError("");
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });
      const body = await res.json();
      if (!res.ok) {
        setError(body.error ?? "Failed to save");
        return;
      }
      setConfig(body.config);
      setMessage(
        "Saved! Hard-refresh the invitation site (Ctrl+F5) to see your changes.",
      );
    } catch {
      setError("Failed to save");
    } finally {
      setSaving(false);
    }
  }, [config]);

  return (
    <ContentConfigContext.Provider
      value={{ config, setConfig, loading, saving, message, error, save }}
    >
      {config && (
        <style dangerouslySetInnerHTML={{ __html: themeCssVars(config.theme) }} />
      )}
      {children}
    </ContentConfigContext.Provider>
  );
}
