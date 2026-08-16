/** Combines conditional class names without adding a dependency. */
export function classNames(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}
