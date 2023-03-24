import createCache from "@emotion/cache";

export default function createEmotionCache() {
  return createCache({
    key: "css", // The prefix before class names (must match regex [^a-z-])
    prepend: true, // Whether to prepend or append style tags into the container node
    // Other options here
  });
}
