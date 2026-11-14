"use client";

import Link from "next/link";
import { useState } from "react";

import { GuideCard } from "../../_components/guide-card";
import type { GuideSummary } from "../../_content/guides/types";
import { filterGuides } from "../_lib/filter-guides";
import styles from "../guides.module.css";

type GuidesBrowserProps = { guides: GuideSummary[] };

const featuredSlug = "como-buscar-maestrias-en-alemania";

export function GuidesBrowser({ guides }: GuidesBrowserProps) {
  const [category, setCategory] = useState("Todas");
  const [query, setQuery] = useState("");
  const categories = ["Todas", ...new Set(guides.map((guide) => guide.category))];
  const filteredGuides = filterGuides(guides, category, query);
  const defaultView = category === "Todas" && query.trim() === "";
  const featuredGuide = defaultView ? guides.find((guide) => guide.slug === featuredSlug) : undefined;
  const gridGuides = featuredGuide
    ? filteredGuides.filter((guide) => guide.slug !== featuredSlug)
    : filteredGuides;

  return (
    <section className={styles.browser} aria-labelledby="browse-heading">
      <div className={styles.browserHeading}>
        <div>
          <p className={styles.eyebrow}>LA BIBLIOTECA</p>
          <h2 id="browse-heading">Encuentra tu próxima lectura.</h2>
        </div>
        <p>Busca un tema o elige una categoría para encontrar la guía que necesitas ahora.</p>
      </div>

      <div className={styles.filters}>
        <label className={styles.searchField} htmlFor="guide-search">
          <span>Buscar guías</span>
          <input
            id="guide-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Por ejemplo: becas, visa, maestría..."
          />
        </label>
        <label className={styles.categoryField} htmlFor="guide-category">
          <span>Categoría</span>
          <select id="guide-category" value={category} onChange={(event) => setCategory(event.target.value)}>
            {categories.map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
        </label>
        <button className={styles.clearButton} type="button" onClick={() => { setCategory("Todas"); setQuery(""); }}>
          Limpiar filtros
        </button>
      </div>

      <p className={styles.resultCount} aria-live="polite">
        {filteredGuides.length} {filteredGuides.length === 1 ? "guía encontrada" : "guías encontradas"}
      </p>

      {featuredGuide ? (
        <Link href={`/guias/${featuredGuide.slug}`} className={styles.featuredGuide}>
          <span className={styles.featuredLabel}>LECTURA DESTACADA <span aria-hidden="true">✳</span></span>
          <span className={styles.featuredCategory}>{featuredGuide.category} · {featuredGuide.readingTime} de lectura</span>
          <strong>{featuredGuide.title}</strong>
          <span className={styles.featuredSummary}>{featuredGuide.summary}</span>
          <span className={styles.featuredAction}>Leer guía <span aria-hidden="true">↗</span></span>
        </Link>
      ) : null}

      {gridGuides.length ? (
        <div className={styles.cardGrid}>
          {gridGuides.map((guide) => (
            <GuideCard key={guide.slug} guide={guide} href={`/guias/${guide.slug}`} variant="full" />
          ))}
        </div>
      ) : filteredGuides.length === 0 ? (
        <div className={styles.emptyState}>
          <h3>No encontramos guías con esos filtros.</h3>
          <p>Prueba otra búsqueda o limpia los filtros para explorar toda la biblioteca.</p>
        </div>
      ) : null}
    </section>
  );
}
