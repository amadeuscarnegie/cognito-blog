# Search

How search works across Cognito — the marketing site (this repo) and the main learning platform.

---

## Part 1: FAQ search (current implementation)

The `/faq` page uses **client-side fuzzy search** powered by [Fuse.js](https://www.fusejs.io/) (~6KB gzipped). All FAQ data ships in the page bundle — no API calls, no backend, instant results.

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

Two matching paths run in parallel, deduped via a `Set` of FAQ IDs:

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

**2. Direct category substring match** — if the query is a substring of a category name (e.g. "billing"), all FAQs in that category are included. This ensures broad category browsing isn't limited to Fuse.js's per-item scoring.

### Keywords

Each FAQ item has an optional `keywords: string[]` field in `src/lib/content-data.ts`. Keywords include:
- **Synonyms** — "cancel" has "unsubscribe", "stop", "end subscription"
- **Related terms** — "phone" has "mobile", "tablet", "ipad", "android"
- **Common misspellings** — "cancel" has "cancle"
- **Concepts** — "free" has "cost", "price", "pricing", "payment"

Keywords are weighted at 0.3 (second highest) so they strongly influence results without overpowering direct question matches.

### Deep linking

The page reads `?q=` from the URL on the server and passes it as `initialSearchQuery` to the client component:
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

### Limitations of Fuse.js for FAQ

- **No semantic understanding** — "how much does it cost" won't match "pricing" unless keywords bridge the gap
- **No ranking by relevance within categories** — matched items appear in their original order
- **Keyword maintenance** — keywords must be manually curated per FAQ item
- **Bundle size** — all FAQ data + Fuse.js ships in the client bundle (~6KB for Fuse + FAQ data)

---

## Part 2: Marketing site — full-site search

The marketing site (this repo) will eventually have blogs, FAQs, and concept pages (active transport, the heart, Third Reich, convection, etc.). This is a few thousand pages of mostly static content that changes at publish time, not in real-time.

### Recommended: Pagefind

[Pagefind](https://pagefind.app/) is the best fit for the marketing site. It's free, open source, and requires zero infrastructure.

**What it is:** A static search library that generates a search index at build time as part of the Next.js build. It ships a ~5KB JS client that lazy-loads index chunks as the user types. The entire index lives on the CDN alongside the site — no server, no API key, no ongoing cost.

**Capabilities:**
- Fuzzy matching with typo tolerance
- Word stemming (searching "cancelling" matches "cancel")
- Content weighting (boost titles over body text)
- Filtering and facets (filter by content type, subject)
- Sub-100ms search on corpora of thousands of pages

**How to integrate:**

```bash
pnpm add -D pagefind
```

Add a postbuild script to `package.json`:

```json
{
  "scripts": {
    "postbuild": "pagefind --site .next/server/app --output-path public/pagefind"
  }
}
```

Drop in the search UI:

```tsx
// Pagefind ships its own UI, or you can use the JS API
import { PagefindUI } from "@pagefind/default-ui";

// Or use the raw JS API for custom UI:
const pagefind = await import("/pagefind/pagefind.js");
await pagefind.init();
const results = await pagefind.search("active transport");
```

**Why Pagefind over alternatives for the marketing site:**
- No accounts, no dashboards, no API keys — everything is in code
- Free forever — it's static files on the CDN
- Handles a few thousand pages easily
- Works with Next.js static/SSG output
- The search index updates automatically on every deploy

**Limitations:**
- No semantic/vector search — it's text matching, not meaning matching
- Requires a build step (not real-time indexing)
- Best suited for static content; not ideal for frequently changing data

### Alternatives considered

| Solution | Cost | Vector search? | Effort | Notes |
|---|---|---|---|---|
| **Pagefind** | Free | No | Low — postbuild script + component | Best fit for static marketing site |
| **Meilisearch** (self-hosted) | ~$5/mo VPS | No (cloud-only for vectors) | Medium — push docs via API | Overkill unless facets/ranking are critical |
| **Meilisearch Cloud** | ~$30-60/mo | Yes (built-in) | Low — SDK only | Good if you want managed + semantic |
| **Typesense** (self-hosted) | ~$5-10/mo VPS | Yes | Medium — Docker + SDK | More powerful but more ops |
| **Typesense Cloud** | ~$20-50/mo | Yes | Low — SDK only | Good managed option with vectors |

---

## Part 3: Main platform search

The main platform (cognito-main-client + common-server) has a fundamentally different scale: ~100 courses, each with ~100 subtopics, each with revision notes, quiz questions, and flashcards. That's 10,000+ searchable documents. Users search with natural language ("what's the formula for speed distance time", "how does osmosis work", "third reich timeline").

### Stack context

The platform runs on:
- **Database:** MongoDB with Mongoose 5.x
- **Backend:** Node.js 20 + Express + Apollo Server (GraphQL)
- **Frontend:** React 18 + Apollo Client
- **Hosting:** AWS (Elastic Beanstalk, S3, CloudFront)

### Why Fuse.js and Pagefind won't work here

- **Scale** — 10k+ documents can't be shipped to the client
- **Semantic needs** — "how does blood move" should find circulatory system content, not just pages containing those exact words
- **Structured filtering** — need to filter by subject, level (GCSE/A-Level), content type (notes vs questions vs flashcards), exam board
- **Dynamic content** — V2 courses are AI-generated and change more frequently than static marketing pages

### Recommended: MongoDB Atlas Search + vector search

MongoDB Atlas has built-in full-text search and vector search. Since the platform is already on MongoDB, this is the zero-new-infrastructure option.

**Atlas Search** (full-text) gives you:
- Lucene-based text search on MongoDB collections — no separate search engine
- Fuzzy matching, autocomplete, synonyms, facets, scoring, highlighting
- Define search indexes in code via the Atlas CLI or Terraform
- Query via aggregation pipeline (`$search` stage) in your existing Mongoose/GraphQL resolvers

**Atlas Vector Search** (semantic) gives you:
- Store embedding vectors as a field in your existing documents
- kNN similarity search via `$vectorSearch` aggregation stage
- Combine with `$search` for hybrid text + semantic results
- No new database — it's a capability of Atlas, not a separate service

#### How it would work

**1. Create a search index (one-time, in code)**

Using the Atlas CLI:

```bash
atlas deployments search indexes create \
  --clusterName production \
  --db cognito \
  --collection subtopics \
  --file search-index.json
```

Where `search-index.json` defines:

```json
{
  "name": "subtopic_search",
  "type": "search",
  "definition": {
    "mappings": {
      "dynamic": false,
      "fields": {
        "title": { "type": "string", "analyzer": "lucene.english" },
        "content": { "type": "string", "analyzer": "lucene.english" },
        "subject": { "type": "stringFacet" },
        "level": { "type": "stringFacet" },
        "contentType": { "type": "stringFacet" }
      }
    }
  }
}
```

**2. Add vector embeddings to documents**

Add an `embedding` field to subtopic documents. Generate embeddings when content is created or updated:

```ts
import OpenAI from "openai";
const openai = new OpenAI();

async function generateEmbedding(subtopic: Subtopic): Promise<number[]> {
  const text = `${subtopic.title} ${subtopic.content}`;
  const response = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: text,
  });
  return response.data[0].embedding;
}

// In your Mongoose pre-save hook or content pipeline:
subtopicSchema.pre("save", async function () {
  if (this.isModified("title") || this.isModified("content")) {
    this.embedding = await generateEmbedding(this);
  }
});
```

Create a vector search index:

```json
{
  "name": "subtopic_vector",
  "type": "vectorSearch",
  "definition": {
    "fields": [{
      "type": "vector",
      "path": "embedding",
      "numDimensions": 1536,
      "similarity": "cosine"
    }]
  }
}
```

**3. Query from your GraphQL resolver**

Full-text search:

```ts
const searchResults = await Subtopic.aggregate([
  {
    $search: {
      index: "subtopic_search",
      compound: {
        must: [{ text: { query: userQuery, path: ["title", "content"], fuzzy: { maxEdits: 1 } } }],
        filter: [
          ...(subject ? [{ equals: { path: "subject", value: subject } }] : []),
          ...(level ? [{ equals: { path: "level", value: level } }] : []),
        ],
      },
    },
  },
  { $limit: 20 },
  { $project: { title: 1, subject: 1, level: 1, contentType: 1, score: { $meta: "searchScore" } } },
]);
```

Vector search:

```ts
const queryEmbedding = await generateEmbedding({ title: userQuery, content: "" });

const semanticResults = await Subtopic.aggregate([
  {
    $vectorSearch: {
      index: "subtopic_vector",
      path: "embedding",
      queryVector: queryEmbedding,
      numCandidates: 100,
      limit: 20,
    },
  },
  { $project: { title: 1, subject: 1, score: { $meta: "vectorSearchScore" } } },
]);
```

Hybrid (combine both, dedupe, re-rank):

```ts
async function hybridSearch(query: string, filters: Filters) {
  const [textResults, vectorResults] = await Promise.all([
    textSearch(query, filters),
    vectorSearch(query, filters),
  ]);

  // Reciprocal rank fusion — simple and effective
  const scores = new Map<string, number>();
  const k = 60; // constant for RRF

  textResults.forEach((doc, i) => {
    const id = doc._id.toString();
    scores.set(id, (scores.get(id) ?? 0) + 1 / (k + i + 1));
  });
  vectorResults.forEach((doc, i) => {
    const id = doc._id.toString();
    scores.set(id, (scores.get(id) ?? 0) + 1 / (k + i + 1));
  });

  // Sort by combined score, dedupe
  const allDocs = [...textResults, ...vectorResults];
  const seen = new Set<string>();
  return allDocs
    .sort((a, b) => (scores.get(b._id.toString()) ?? 0) - (scores.get(a._id.toString()) ?? 0))
    .filter((doc) => {
      const id = doc._id.toString();
      if (seen.has(id)) return false;
      seen.add(id);
      return true;
    });
}
```

**4. Expose via GraphQL**

Add a `search` query to your schema:

```graphql
type SearchResult {
  id: ID!
  title: String!
  subject: String!
  level: String!
  contentType: String!  # "revision_notes" | "quiz" | "flashcard"
  score: Float!
}

type Query {
  search(
    query: String!
    subject: String
    level: String
    contentType: String
    limit: Int = 20
  ): [SearchResult!]!
}
```

#### Cost

| Component | Cost |
|---|---|
| Atlas Search (full-text) | Free on M10+ clusters (included in Atlas pricing) |
| Atlas Vector Search | Free on M10+ clusters (included in Atlas pricing) |
| Embedding generation (OpenAI) | ~$0.02 per 1M tokens (~$0.20 to embed all 10k subtopics once) |
| Embedding per query | ~$0.0001 per search |

If the platform is on Atlas already, the search features are included at no extra cost. If it's on a self-managed MongoDB, upgrading to Atlas M10 (~$60/mo) would be needed, or you'd use a separate search engine.

### Alternatives for the platform

| Solution | Cost | Fits MongoDB stack? | Vector search? | Setup effort |
|---|---|---|---|---|
| **MongoDB Atlas Search** | Included in Atlas | Perfect — same database | Yes | Low — search indexes + aggregation queries |
| **Typesense** (self-hosted) | ~$10/mo VPS | Separate system — push docs via API | Yes | Medium — Docker, sync pipeline, SDK |
| **Meilisearch** (self-hosted) | ~$5/mo VPS | Separate system — push docs via API | No (OSS) / Yes (cloud) | Medium |
| **Elasticsearch/OpenSearch** | ~$30-100/mo | Separate system — heavy ops | Yes | High — JVM, cluster management |

**Atlas Search is the clear winner** if you're on Atlas — it's the same database, no sync pipeline, no new infrastructure, and it supports both full-text and vector search. Everything is configured in code via the Atlas CLI.

If you're on self-managed MongoDB and don't want to move to Atlas, **Typesense** is the best standalone option — self-hostable, open source, supports hybrid text + vector search, and has a Node.js SDK that fits the existing stack.

---

## Part 4: Vector search explained

This section explains vector search from first principles — how it works, why it matters, and what it gets you over traditional text search.

### What is vector search?

Traditional text search matches words: "cancel subscription" finds documents containing "cancel" and "subscription". Vector search matches **meaning**: "stop paying for my account" finds the same documents even though it shares no words.

It works by converting text into **embedding vectors** — arrays of numbers (typically 512-1536 floats) that represent the meaning of the text in a high-dimensional space. Texts with similar meanings produce vectors that are close together.

```
"how much does it cost"        → [0.12, -0.34, 0.56, ...]
"Can I use Cognito for free?"  → [0.11, -0.31, 0.58, ...]
cosine_similarity = 0.94  ← high = good match

"how much does it cost"        → [0.12, -0.34, 0.56, ...]
"The French Revolution began"  → [-0.45, 0.78, -0.12, ...]
cosine_similarity = 0.15  ← low = not relevant
```

### How embeddings are generated

An embedding model (a neural network trained on massive text corpora) converts text into a fixed-size vector. You call it via API:

```ts
const response = await openai.embeddings.create({
  model: "text-embedding-3-small",
  input: "What is active transport in biology?",
});
const vector = response.data[0].embedding; // [0.012, -0.034, 0.056, ... ] (1536 floats)
```

The model understands that "active transport" is related to "cell membrane", "ATP", "against concentration gradient" — even without those words appearing in the query.

### The search flow

1. **At index time** — generate an embedding for each document and store it alongside the content
2. **At query time** — generate an embedding for the user's search query
3. **Compare** — find documents whose embeddings are closest to the query embedding (cosine similarity or dot product)
4. **Return** — the nearest documents, ranked by similarity score

### Benefits over text search

| Capability | Text search (Fuse.js, Pagefind, Lucene) | Vector search |
|---|---|---|
| Exact word matching | Excellent | Good (not its strength) |
| Typo tolerance | Configurable (fuzzy) | Natural (embeddings are robust to typos) |
| Synonym matching | Manual (keywords/synonym lists) | Automatic — "cost" ≈ "price" ≈ "how much" |
| Semantic understanding | None | Yes — "stop paying" ≈ "cancel subscription" |
| Cross-concept matching | None | Yes — "what makes blood flow" ≈ "the heart" |
| Multi-language | Needs per-language config | Multilingual models exist (one index for all languages) |
| Keyword curation | Required for good coverage | Not needed |
| Latency | Instant (client-side) or ~10ms (server) | ~100-200ms (embedding API call) |
| Offline support | Yes | No (needs embedding API for query) |
| Cost per query | Free | ~$0.0001 (embedding API) |

### When text search is enough

- Small corpus (under ~500 items)
- Users search with specific terms they expect to find
- Content has clear, distinctive vocabulary
- Keywords can reasonably cover synonym gaps

### When you need vector search

- Users search with natural language questions
- Content spans many domains (biology, history, maths, physics) where the same concept has different vocabulary
- You want "how does blood move" to find "circulatory system" and "the heart"
- Analytics show frequent "no results" for queries that should have matched
- Multi-language support is needed

### Hybrid search: the best of both

In practice, the best results come from combining text and vector search:

1. Run both searches in parallel
2. Merge results using reciprocal rank fusion (RRF) — a simple formula that combines the ranking positions from each method
3. Text search catches exact keyword matches that vector search might rank lower
4. Vector search catches semantic matches that text search would miss entirely

This is what MongoDB Atlas Search + Vector Search enables natively, and what Typesense supports as a single query.

### Recommended embedding models

| Model | Dimensions | Cost | Best for |
|---|---|---|---|
| OpenAI `text-embedding-3-small` | 1536 | $0.02/1M tokens | General purpose, excellent quality |
| OpenAI `text-embedding-3-large` | 3072 | $0.13/1M tokens | Maximum quality, higher dimensions |
| Cohere `embed-english-v3.0` | 1024 | Free tier available | English-focused, cost-effective |
| Voyage `voyage-3-lite` | 512 | $0.02/1M tokens | Smallest vectors, good for constrained storage |

For Cognito's educational content, `text-embedding-3-small` is the right starting point — excellent quality at minimal cost. Embedding all 10k subtopics would cost ~$0.20 once, and each user search costs ~$0.0001.

---

## Summary: what to use where

| Context | Solution | Cost | Why |
|---|---|---|---|
| FAQ page (23 items) | **Fuse.js** (current) | Free | Small corpus, instant client-side, works great |
| Marketing site (few thousand pages) | **Pagefind** | Free | Static site, build-time index, zero infra |
| Main platform (10k+ documents) | **MongoDB Atlas Search + Vector Search** | Included in Atlas | Same database, hybrid search, no new infra |
| Main platform (if not on Atlas) | **Typesense** (self-hosted) | ~$10/mo | Best standalone option with hybrid search |
