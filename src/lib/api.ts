// Thin client for the WDRA operator backend. All calls run server-side
// (server actions / server components) so the bearer token never reaches the
// browser and the plain-HTTP endpoint causes no mixed-content issues.

const API_BASE =
  process.env.API_URL ?? "http://3.111.162.230:8080/api/v1";

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export type ApiUser = {
  id: string;
  phone: string;
  role: string;
  full_name: string;
  country?: string;
  preferred_language?: string;
};

export type LoginResponse = {
  success: boolean;
  message?: string;
  user: ApiUser;
  session: {
    access_token: string;
    refresh_token: string;
    expires_in: number;
    expires_at: number;
    token_type: string;
  };
};

export type BookingStatus = "pending" | "accepted" | "rejected";

export type Booking = {
  id: string;
  status: BookingStatus;
  warehouseId: string;
  warehouseName: string;
  location: string;
  farmerName: string;
  farmerPhone: string;
  commodity: string;
  commodityLabel: string;
  quantityQuintal: number;
  startDate: string;
  durationDays: number;
  endDate: string;
  services: unknown[];
  estimatedCost: {
    amount: number;
    months: number;
    currency: string;
    storagePerQuintalPerMonth: number;
  };
  createdAt: string;
  invoice: unknown | null;
  canGenerateInvoice: boolean;
};

export async function apiLogin(
  phoneNumber: string,
  password: string,
): Promise<LoginResponse> {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phoneNumber, password }),
    cache: "no-store",
  });
  const data = await res.json().catch(() => null);
  if (!res.ok || !data?.success) {
    throw new ApiError(
      data?.message ?? "Invalid User ID or password.",
      res.status,
    );
  }
  return data as LoginResponse;
}

export async function getOperatorBookings(
  token: string,
  status?: BookingStatus,
): Promise<Booking[]> {
  const url = new URL(`${API_BASE}/operator/bookings`);
  if (status) url.searchParams.set("status", status);

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!res.ok) {
    throw new ApiError("Failed to load bookings.", res.status);
  }
  const data = await res.json();
  return (data?.bookings ?? []) as Booking[];
}

export async function postBookingDecision(
  token: string,
  bookingId: string,
  decision: "accepted" | "rejected",
): Promise<void> {
  const res = await fetch(
    `${API_BASE}/operator/bookings/${bookingId}/decision`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ decision }),
      cache: "no-store",
    },
  );
  if (!res.ok) {
    throw new ApiError("Failed to update the booking.", res.status);
  }
}
