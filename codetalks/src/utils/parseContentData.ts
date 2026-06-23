type FirebaseRecord<T> = Record<string, T>;

export default function parseContentData<T extends { createdAt: string }>(
  data: FirebaseRecord<T>
): (T & { id: string })[] {
  return Object.keys(data).map((key) => ({
    id: key,
    ...data[key],
  }));
  // .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}
