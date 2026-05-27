export type RsvpResponse = {
  id: string;
  full_name: string;
  email: string | null;
  attending: boolean;
  guest_count: number;
  dietary_notes: string | null;
  message: string | null;
  created_at: string;
};
