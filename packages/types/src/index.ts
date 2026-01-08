// Button props
export type ButtonVariant = "primary" | "secondary" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

// Shared API response type
export interface ApiResponse<T> {
  data: T;
  status: number;
  error?: string;
}

// Shared form field type
export interface FormField<T = any> {
  name: string;
  value: T;
  error?: string;
}

// Optional: reusable utility types
export type Nullable<T> = T | null;
export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};
