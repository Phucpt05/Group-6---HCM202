import React from "react";

interface HighlightedTextProps {
  text: string;
  terms: string[];
}

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export const HighlightedText: React.FC<HighlightedTextProps> = ({ text, terms }) => {
  const normalizedTerms = Array.from(new Set(terms.map((term) => term.trim()).filter(Boolean)))
    .sort((first, second) => second.length - first.length);

  if (normalizedTerms.length === 0) return <>{text}</>;

  const expression = new RegExp(`(${normalizedTerms.map(escapeRegExp).join("|")})`, "gi");
  const highlightedTerms = new Set(normalizedTerms.map((term) => term.toLocaleLowerCase("vi")));

  return (
    <>
      {text.split(expression).map((part, index) => highlightedTerms.has(part.toLocaleLowerCase("vi")) ? (
        <mark className="inline-keyword" key={`${part}-${index}`}>{part}</mark>
      ) : (
        <React.Fragment key={`${part}-${index}`}>{part}</React.Fragment>
      ))}
    </>
  );
};
