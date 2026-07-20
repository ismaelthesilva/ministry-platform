import React from "react";

const EMPHASIS_RE = /\*\*\*(.+?)\*\*\*|\*\*(.+?)\*\*|\*(.+?)\*/g;

/**
 * Parses the markdown-lite emphasis (***bold italic***, **bold**, *italic*)
 * produced by the book's content pipeline into React nodes. Intentionally
 * minimal — this content only ever uses bold/italic, so a full markdown
 * parser would be more machinery than the input needs. The triple-star form
 * shows up wherever the source book bolds a phrase inside an italicized
 * scripture quotation.
 */
export function renderInline(text: string, keyPrefix = ""): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let i = 0;
  EMPHASIS_RE.lastIndex = 0;
  while ((match = EMPHASIS_RE.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    if (match[1] !== undefined) {
      nodes.push(
        <strong key={`${keyPrefix}-bi-${i++}`}>
          <em>{match[1]}</em>
        </strong>
      );
    } else if (match[2] !== undefined) {
      nodes.push(<strong key={`${keyPrefix}-b-${i++}`}>{match[2]}</strong>);
    } else if (match[3] !== undefined) {
      nodes.push(<em key={`${keyPrefix}-i-${i++}`}>{match[3]}</em>);
    }
    lastIndex = EMPHASIS_RE.lastIndex;
  }
  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }
  return nodes;
}

export function RichText({
  text,
  as: Tag = "span",
  className,
}: {
  text: string;
  as?: React.ElementType;
  className?: string;
}) {
  return <Tag className={className}>{renderInline(text)}</Tag>;
}
