# nextstring

nextstring is a powerful TypeScript library that extends the native `String` prototype with AI-driven capabilities. Perform advanced operations on strings — extract data, answer questions, summarize, translate, classify, score, mask sensitive data, and more — all powered by a configurable AI provider.

## Features

| Method | Description |
|--------|-------------|
| `extractData(items)` | Extract structured data from text with optional type parsing |
| `question(q)` | Answer questions using the string as context |
| `summarise(words)` | Summarize text to a target word count |
| `checkIf(condition)` | Evaluate a condition against the string's content |
| `translate(language)` | Translate text to a target language |
| `rewrite(instructions)` | Rewrite text following specific instructions |
| `classifyText(categories)` | Classify text into predefined categories |
| `fill(context)` | Fill `{{placeholder}}` templates using AI-inferred values |
| `generate(instructions?)` | Use the string as a prompt to generate content |
| `score(rubrics)` | Score text against rubrics, returns numeric scores |
| `mask(rules)` | Partially mask sensitive data (emails, phones, SSNs, etc.) |
| `detectLanguage()` | Detect the language of the given text |

All methods accept an optional `{ model: string }` options object as the last parameter to override the default model per call.

## Installation

```bash
npm install nextstring
```

## Quick Start

### 1. Initialize with a provider

```typescript
import { initialise, OpenaiProvider } from "nextstring";

// OpenAI
const provider = new OpenaiProvider({ apiKey: "sk-..." });
initialise(provider);

// or Gemini
import { GeminiProvider } from "nextstring";
const provider = new GeminiProvider({ apiKey: "AI..." });
initialise(provider);

// or Claude
import { ClaudeProvider } from "nextstring";
const provider = new ClaudeProvider({ apiKey: "sk-ant-..." });
initialise(provider);
```

### 2. Use AI methods on any string

```typescript
const answer = await "The Eiffel Tower is in Paris.".question("Where is the Eiffel Tower?");
// "Paris"
```

## Providers

| Provider | Default Model | Import |
|----------|--------------|--------|
| **OpenAI** | `gpt-4o-mini` | `OpenaiProvider` |
| **Google Gemini** | `gemini-2.5-flash` | `GeminiProvider` |
| **Anthropic Claude** | `claude-sonnet-4-20250514` | `ClaudeProvider` |

Each provider accepts a `globalPrompt` parameter to prepend instructions to every request.

```typescript
const provider = new OpenaiProvider(
  { apiKey: "sk-..." },
  "gpt-4o",           // model
  "Always be concise"  // globalPrompt
);
```

## Examples

### Extract Data

Extract structured fields with optional type parsing via `parse`:

```typescript
const text = "John is 30, email: john@example.com";
const result = await text.extractData([
  { name: "email", description: "Email address" },
  { name: "age", description: "Age", parse: Number },
]);
// { email: "john@example.com", age: 30 }
// result.email → string, result.age → number (inferred from parse)
```

### Summarize

```typescript
const summary = await "A very long article about climate change...".summarise(20);
```

### Check Conditions

```typescript
const isSunny = await "The weather today is sunny and warm.".checkIf("Is it sunny?");
// true
```

### Translate

```typescript
const spanish = await "Hello, how are you?".translate("spanish");
// "Hola, ¿cómo estás?"
```

### Rewrite

```typescript
const formal = await "hey whats up".rewrite("Make it formal");
// "Hello, how are you doing?"
```

### Classify Text

```typescript
const category = await "My app keeps crashing".classifyText([
  { name: "support", description: "Technical support issues" },
  { name: "sales", description: "Sales inquiries" },
]);
// "support"
```

### Fill Templates

```typescript
const filled = await "Dear {{name}}, your order {{orderId}} is {{status}}.".fill({
  name: "Alice",
  order: { id: "ORD-123", shipped: true },
});
// "Dear Alice, your order ORD-123 is shipped."
```

### Generate Content

```typescript
const content = await "a product description for running shoes".generate();

const email = await "a professional email declining a meeting".generate(
  "Keep it under 50 words"
);
```

### Score Text

Score text against custom rubrics (returns 0-10 for each):

```typescript
const scores = await "The quick brown fox jumps over the lazy dog.".score([
  { id: "grammar", name: "Grammar", description: "Correct grammar and punctuation" },
  { id: "clarity", name: "Clarity", description: "Clear and easy to understand" },
]);
// { grammar: 9, clarity: 8 }
```

### Mask Sensitive Data

Partially redact sensitive information while preserving format:

```typescript
const masked = await "Contact john@example.com or call 555-123-4567".mask(["email", "phone"]);
// "Contact j***@e******.com or call ***-***-4567"

const masked2 = await "SSN: 123-45-6789".mask(["ssn"]);
// "SSN: ***-**-6789"
```

### Detect Language

```typescript
const lang = await "Bonjour le monde".detectLanguage();
// "French"

const lang2 = await "こんにちは世界".detectLanguage();
// "Japanese"
```

### Per-Call Model Override

Any method accepts an optional model override as the last argument:

```typescript
const answer = await "some text".question("What is this?", { model: "gpt-4o" });
const summary = await "long text".summarise(10, { model: "claude-sonnet-4-20250514" });
```

## Full Scenario: AI-Powered Customer Support

```typescript
const message = "Bonjour, je suis Alice. La commande #12345 doit être remboursée. Mon email est alice@test.com";

// Detect language for routing
const language = await message.detectLanguage();
// "French"

// Extract structured data
const data = await message.extractData([
  { name: "name", description: "Customer name" },
  { name: "orderID", description: "Order ID" },
  { name: "email", description: "Email address" },
]);
// { name: "Alice", orderID: "12345", email: "alice@test.com" }

// Translate to English for internal processing
const english = await message.translate("english");
// "Hello, I'm Alice. Order #12345 needs a refund. My email is alice@test.com"

// Understand intent
const intent = await english.classifyText([
  { name: "refund", description: "Refund requests" },
  { name: "tracking", description: "Order tracking" },
  { name: "general", description: "General inquiries" },
]);
// "refund"

// Mask PII for logging
const safe = await english.mask(["email", "name"]);
// "Hello, I'm [NAME]. Order #12345 needs a refund. My email is a****@t***.com"

// Generate a reply and translate back to the customer's language
const reply = await "a polite refund confirmation for order #12345".generate();
const localizedReply = await reply.translate(language);
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
