import { Helmet } from "react-helmet-async";

export default function SEO({
  title,
  description,
  image,
  url,
  type = "website",
  noIndex = false,
}) {
  const siteName = "Miashka";

  const finalTitle = title
    ? `${title} | ${siteName}`
    : `${siteName} | Diamond Jewellery`;

  const defaultDescription =
    "Discover beautifully crafted diamond and gold jewellery at Miashka.";

  const finalDescription = description || defaultDescription;

  return (
    <Helmet>
      {/* =========================
          BASIC SEO
      ========================== */}

      <title>{finalTitle}</title>

      <meta
        name="description"
        content={finalDescription}
      />

      {/* =========================
          ROBOTS
      ========================== */}

      <meta
        name="robots"
        content={noIndex ? "noindex, nofollow" : "index, follow"}
      />

      {/* =========================
          OPEN GRAPH
      ========================== */}

      <meta property="og:title" content={finalTitle} />

      <meta
        property="og:description"
        content={finalDescription}
      />

      <meta property="og:type" content={type} />

      <meta property="og:site_name" content={siteName} />

      {url && (
        <meta
          property="og:url"
          content={url}
        />
      )}

      {image && (
        <meta
          property="og:image"
          content={image}
        />
      )}

      {/* =========================
          TWITTER / X
      ========================== */}

      <meta
        name="twitter:card"
        content="summary_large_image"
      />

      <meta
        name="twitter:title"
        content={finalTitle}
      />

      <meta
        name="twitter:description"
        content={finalDescription}
      />

      {image && (
        <meta
          name="twitter:image"
          content={image}
        />
      )}
    </Helmet>
  );
}