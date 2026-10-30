"use client";
import { useState } from "react";
import Link from "next/link";
import { searchVerses, parseVerseRef } from "@/lib/vbt/search";
import type { VbtBook } from "@/lib/vbt/types";
import { vbtStrings } from "@/lib/vbt/strings";

function normalize(s: string) {
  return s
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();
}

function highlight(text: string, query: string): React.ReactNode {
  const nq = normalize(query);
  const nt = normalize(text);
  const idx = nt.indexOf(nq);
  if (idx === -1 || !nq) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark>{text.slice(idx, idx + query.length)}</mark>
      {text.slice(idx + query.length)}
    </>
  );
}

export function VbtSearch({ book }: { book: VbtBook }) {
  const [query, setQuery] = useState("");
  const [includeNotes, setIncludeNotes] = useState(false);

  const ref = query.trim() ? parseVerseRef(query) : null;
  const results =
    !ref && query.trim() ? searchVerses(book, query, includeNotes) : [];
  const redirectHref = ref
    ? `/venibible/apocalipse/${ref.chapter}#v${ref.verse}`
    : null;

  return (
    <div
      className="vbt-search"
      role="search"
      aria-label={vbtStrings.searchLabel}
    >
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={vbtStrings.searchPlaceholder}
        aria-label={vbtStrings.searchLabel}
        className="vbt-search-input"
      />
      <label
        style={{
          fontSize: "0.85rem",
          display: "flex",
          gap: "0.4rem",
          alignItems: "center",
        }}
      >
        <input
          type="checkbox"
          checked={includeNotes}
          onChange={(e) => setIncludeNotes(e.target.checked)}
        />
        {vbtStrings.showNotes}
      </label>
      {redirectHref && (
        <p style={{ marginTop: "0.5rem" }}>
          <Link href={redirectHref}>Ir para {query.trim()}</Link>
        </p>
      )}
      {query.trim() && !redirectHref && (
        <p
          className="search-count"
          style={{ fontSize: "0.82rem", color: "#666", marginTop: "0.4rem" }}
        >
          {results.length > 0
            ? vbtStrings.searchResults(results.length)
            : vbtStrings.noResults}
        </p>
      )}
      <ul
        className="search-results"
        style={{ listStyle: "none", padding: 0, marginTop: "0.5rem" }}
      >
        {results.map((r) => (
          <li key={`${r.chapter}:${r.verse}`}>
            <Link href={`/venibible/apocalipse/${r.chapter}#v${r.verse}`}>
              <strong>
                Ap {r.chapter}:{r.verse}
              </strong>{" "}
              <span>{highlight(r.text, query)}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
