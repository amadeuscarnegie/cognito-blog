# FAQ Search

How search works on the `/faq` page — current implementation and future vector search direction.

---

## Current implementation (Fuse.js)

The FAQ search is a **client-side fuzzy search** powered by [Fuse.js](https://www.fusejs.io/) (~6KB gzipped). All FAQ data is shipped in the page bundle — no API calls, no backend, instant results.

### Architecture

```
page.tsx (server component)
  ├── reads ?q= from searchParams → initialSearchQuery
  └── passes categories + initialSearchQuery to:

faq-interactive.tsx (client component)
  ├── builds flat search corpus from all categories
  ├── creates Fuse.js index with weighted keys
  ├── uses useDeferredValue for debounced filtering
  ├── syncs search to URL via router.replace()
  └── logs searches via analytics.ts stub
```

### How matching works

There are two matching paths that run in parallel, with results deduped via a `Set` of FAQ IDs:

**1. Fuse.js fuzzy matching** — searches individual FAQ items across weighted fields:

| Field | Weight | Purpose |
|---|---|---|
| `question` | 0.4 | Primary match — the question text itself |
| `keywords` | 0.3 | Synonyms, related terms, common misspellings |
| `answer` | 0.2 | Answer body text |
| `categoryName` | 0.1 | Category name (e.g. "Billing & Subscription") |

Fuse.js config:
- `threshold: 0.4` — allows typo tolerance (e.g. "cancle" → "cancel")
- `ignoreLocation: true` — matches anywhere in the string, not just the beginning
- Custom `getFn` that strips accents via Unicode NFD normalization

**2. Direct category substring match** — if the search query is a substring of a category name (e.g. typing "billing"), ALL FAQs in that category are included. This ensures broad category browsing isn't limited to Fuse.js's per-item scoring.

### Keywords

Each FAQ item has an optional `keywords: string[]` field in `src/lib/content-data.ts`. Keywords include:
- **Synonyms** — "cancel" has "unsubscribe", "stop", "end subscription"
- **Related terms** — "phone" has "mobile", "tablet", "ipad", "android"
- **Common misspellings** — "cancel" has "cancle"
- **Concepts** — "free" has "cost", "price", "pricing", "payment"

Keywords are weighted at 0.3 (second highest) so they strongly influence results without overpowering direct question matches.

### Deep linking

The page reads `?q=` from the URL on the server and passes it as `initialSearchQuery` to the client component. This means:
- `/faq?q=billing` → page loads with "billing" pre-filled, results filtered
- Sharing a search URL works as expected
- The page is dynamic (not statically generated) as a result of reading searchParams

### Debouncing

Uses React's `useDeferredValue` instead of a manual debounce timer. The raw `search` state updates immediately (keeping the input responsive), while `deferredSearch` updates on a lower priority — filtering and URL updates use the deferred value.

### Analytics

`src/lib/analytics.ts` exports a `logFaqSearch(query, resultCount)` function:
- In development: logs to console as `[FAQ Search] query="..." results=N`
- In production: no-op (swap in one line for Plausible, PostHog, or sendBeacon)
- Uses a `lastLoggedQuery` ref to avoid duplicate logs for the same query

### Limitations

- **No semantic understanding** — "how much does it cost" won't match "pricing" unless keywords bridge the gap
- **No ranking by relevance within categories** — matched items appear in their original order, not sorted by match quality
- **Keyword maintenance** — keywords must be manually curated per FAQ item
- **Bundle size** — all FAQ data + Fuse.js ships in the client bundle (~6KB for Fuse + FAQ data)

---

## Future direction: vector search

If the FAQ corpus grows significantly or we need semantic understanding ("I want to stop paying" → matches cancellation FAQs), vector similarity search would be the next step.

### What is vector search?

Instead of matching text strings, vector search converts both the search query and each FAQ into **embedding vectors** — high-dimensional numerical representations that capture meaning. Similar meanings produce vectors that are close together in this space, regardless of the exact words used.

```
"how much does it cost" → [0.12, -0.34, 0.56, ...]  ← query embedding
"Can I use Cognito for free?" → [0.11, -0.31, 0.58, ...]  ← FAQ embedding

cosine_similarity = 0.94  ← high similarity = good match
```

### How it would work

**1. Embedding generation (build time or on FAQ change)**

Generate embeddings for each FAQ item by concatenating question + answer + keywords into a single text, then calling an embedding model:

```ts
// Example using OpenAI's text-embedding-3-small
const embedding = await openai.embeddings.create({
  model: "text-embedding-3-small",
  input: `${faq.question} ${faq.answer} ${faq.keywords?.join(" ") ?? ""}`,
});
// Returns a 1536-dimensional float array
```

Store the resulting vectors alongside the FAQ data. For 23 FAQs this is ~140KB of float arrays.

**2. Query embedding (runtime)**

When the user searches, embed their query with the same model:

```ts
const queryEmbedding = await openai.embeddings.create({
  model: "text-embedding-3-small",
  input: userQuery,
});
```

**3. Similarity calculation**

Compute cosine similarity between the query vector and every FAQ vector, then rank by score:

```ts
function cosineSimilarity(a: number[], b: number[]): number {
  let dot = 0, normA = 0, normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

const results = faqs
  .map(faq => ({
    ...faq,
    score: cosineSimilarity(queryEmbedding, faq.embedding),
  }))
  .filter(faq => faq.score > 0.75) // threshold
  .sort((a, b) => b.score - a.score);
```

**4. Architecture options**

| Approach | Latency | Cost | Complexity |
|---|---|---|---|
| **Client-side with pre-computed embeddings** — ship FAQ embeddings in the bundle, use a JS cosine similarity function, call an API only for the query embedding | ~200ms per search | ~$0.0001 per query (embedding API) | Low — no vector DB needed |
| **API route with in-memory vectors** — store FAQ embeddings in a Next.js API route, compute similarity server-side | ~100ms per search | Same | Low |
| **Vector database (Pinecone, Weaviate, pgvector)** — store embeddings in a dedicated vector DB with ANN indexing | ~50ms per search | DB hosting costs | Higher — new infra |

For 23 FAQs (even up to a few hundred), the first two approaches are more than sufficient. A vector DB only becomes worthwhile at thousands of documents.

### Benefits over current Fuse.js approach

| Capability | Fuse.js (current) | Vector search |
|---|---|---|
| Typo tolerance | Yes (fuzzy threshold) | Yes (embeddings are robust to typos) |
| Synonym matching | Only via manual keywords | Automatic — embeddings understand synonyms |
| Semantic understanding | No — "stop paying" won't match "cancel" | Yes — "stop paying" ≈ "cancel subscription" |
| Multi-language | No | Yes — multilingual embedding models exist |
| Keyword curation | Required for good results | Not needed — the model understands meaning |
| Latency | Instant (client-side) | ~100-200ms (API call for query embedding) |
| Offline support | Yes | No (needs embedding API) |
| Cost | Free | ~$0.0001/query for embeddings |
| Bundle size impact | ~6KB (Fuse.js) | ~140KB (FAQ embeddings) or 0KB if server-side |
| Infrastructure | None | Embedding API key (OpenAI, Cohere, Voyage, etc.) |

### Recommended embedding models

- **OpenAI `text-embedding-3-small`** — 1536 dimensions, excellent quality, $0.02/1M tokens
- **Cohere `embed-english-v3.0`** — 1024 dimensions, strong for English, free tier available
- **Voyage `voyage-3-lite`** — 512 dimensions, smallest vectors, good for small corpora

### When to upgrade

The current Fuse.js approach is the right choice while:
- The FAQ corpus is under ~100 items
- Keywords can reasonably cover synonym gaps
- Instant client-side search is preferred over API latency
- No embedding API key/cost is desired

Consider vector search when:
- Users frequently search with natural language that doesn't match keywords
- The FAQ corpus grows beyond what manual keyword curation can cover
- Analytics show a high rate of "no results" searches that should have matched
- Multi-language support is needed

### Hybrid approach

The best real-world setup often combines both: run Fuse.js client-side for instant results, then fire off an async vector search to surface additional semantic matches that appear after a brief delay. This gives users immediate feedback while still catching semantic matches.
