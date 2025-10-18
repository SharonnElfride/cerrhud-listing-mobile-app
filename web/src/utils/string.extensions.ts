/**
 * All String.prototype methods
 */

declare global {
  interface String {
    /**
     * Converts the string to a clean, hyphenated form (kebab-case):
     * - preserves original case
     * - removes accents (diacritics)
     * - strips special characters
     * - replaces whitespace with dashes
     *
     * Useful for safe DOM IDs, filenames, or anchor links where case matters.
     *
     * @example
     * "Much (toto) à liké".toKebabCase() // => "Much-a-like"
     */
    toKebabCase(): string;

    /**
     * Verifies whether a string is empty or not.
     * Returns <code>true</code> if the string is empty, and false otherwise.
     */
    isEmpty(): boolean;

    /**
     * Converts the string to a lowercased kebab-case like string.
     * If an index is provided, it's added at the end of the formed string.
     *
     * @example
     * "MuCh (toto) à lIké".toKeyCase() // => "much-a-like"
     * "MuCh (toto) à lIké".toKeyCase(34) // => "much-a-like-34"
     */
    toKeyCase(index?: number): string;
  }
}

String.prototype.toKebabCase = function (): string {
  return (
    this.normalize("NFD")
      // Removes all Unicode accents
      .replace(/[\u0300-\u036f]/g, "")
      // Removes everything except letters, digits, spaces, and -
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      // Replaces all whitespace (even tabs/newlines) with -
      .replace(/\s+/g, "-")
  );
};

String.prototype.isEmpty = function (): boolean {
  return this.trim().replace(/\s+/g, "").length === 0;
};

String.prototype.toKeyCase = function (index?: number): string {
  const base = this.toKebabCase().toLowerCase();
  return index !== undefined ? `${base}-${index}` : base;
};

export {};
