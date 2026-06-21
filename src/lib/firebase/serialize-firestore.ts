/**
 * Converts Firestore Timestamp values to ISO strings for Server → Client Component props.
 */

function isFirestoreTimestamp(
  value: unknown
): value is { toDate: () => Date } {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof (value as { toDate?: unknown }).toDate === "function"
  );
}

export function serializeFirestoreValue<T>(value: T): T {
  if (value === null || value === undefined) return value;

  if (isFirestoreTimestamp(value)) {
    return value.toDate().toISOString() as T;
  }

  if (Array.isArray(value)) {
    return value.map((item) => serializeFirestoreValue(item)) as T;
  }

  if (typeof value === "object") {
    const record = value as Record<string, unknown>;
    const out: Record<string, unknown> = {};
    for (const [key, nested] of Object.entries(record)) {
      out[key] = serializeFirestoreValue(nested);
    }
    return out as T;
  }

  return value;
}
