// Colors / design tokens
export const COLORS = {
  primary: "#2563eb",
  secondary: "#9ca3af",
  danger: "#dc2626",
};

// Spacing scale
export const SPACING = {
  sm: 4,
  md: 8,
  lg: 16,
};

// Helper functions
export const formatDate = (date: Date) =>
  `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

export const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

// Example: simple fetch wrapper
export async function fetchApi<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Network error");
  return res.json();
}
