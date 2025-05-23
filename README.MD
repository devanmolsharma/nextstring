# nextstring

nextstring is a powerful TypeScript library that extends the native `String` prototype with AI-driven capabilities. It allows developers to perform advanced operations on strings, such as extracting data, answering questions, summarizing text, checking conditions, and translating text, all powered by a configurable AI provider.

## Features

- **Extract Data**: Extract specific information from a string based on descriptions.
- **Answer Questions**: Answer questions using the context of the string.
- **Summarize**: Summarize text to a specified number of words.
- **Check Conditions**: Evaluate conditions based on the string's content.
- **Translate**: Translate text into a specified language.

## Installation

```bash
npm install nextstring
```

## Usage

### Initialization

Before using the library, initialize it with an AI provider:

```typescript
import { initialise, OpenaiProvider } from "nextstring";

const provider = new OpenaiProvider({apiKey: "your-api-key"});
initialise(provider);
```

### Examples

#### 1. Extracting Data

```typescript
const data = "John's email is john.doe@example.com and his phone number is 123-456-7890.";
const items = [
    { name: "email", description: "The email address in the data" },
    { name: "phone", description: "The phone number in the data" },
];

const result = await data.extractData(items);
console.log(result); 
// Output: { email: "john.doe@example.com", phone: "123-456-7890" }
```

#### 2. Answering Questions

```typescript
const text = "The Eiffel Tower is located in Paris, France.";
const question = "Where is the Eiffel Tower located?";

const answer = await text.question(question);
console.log(answer); 
// Output: "Paris, France"
```

#### 3. Summarizing Text

```typescript
const longText = "This is a long paragraph that needs to be summarized into fewer words for better readability.";
const summary = await longText.summarise(10);
console.log(summary); 
// Output: "This is a long paragraph summarized for readability."
```

#### 4. Checking Conditions

```typescript
const content = "The weather today is sunny and warm.";
const condition = "Is the weather sunny?";

const isSunny = await content.checkIf(condition);
console.log(isSunny); 
// Output: true
```

#### 5. Translating Text

```typescript
const text = "Hello, how are you?";
const translatedText = await text.translate("spanish");
console.log(translatedText); 
// Output: "Hola, ¿cómo estás?"
```

#### 6. Rewriting Text

```typescript
const data = "This is some original text.";
const instructions = "Rewrite this to be more formal.";

const rewritten = await data.rewrite(instructions);
console.log(rewritten); 
// Output: "This is some original text rewritten formally."
```

#### 7. Classifying Text

```typescript
const text = "This is a message about a technical issue.";
const categories = [
    { name: "support", description: "Messages related to customer support" },
    { name: "sales", description: "Messages related to sales inquiries" }
];

const result = await text.classifyText(categories);
console.log(result); 
// Output: "support"
```

## Impact on AI Coding

nextstring simplifies the integration of AI capabilities into your applications by abstracting complex AI interactions into intuitive string methods. This allows developers to:

- Focus on building features rather than implementing AI logic.
- Leverage AI for natural language processing tasks with minimal effort.
- Enhance productivity and reduce boilerplate code.

## Sample Scenario: AI-Powered Customer Support

Imagine you're building a customer support chatbot. With nextstring, you can easily extract key information from user messages, answer their questions, summarize lengthy responses, and translate messages for multilingual support.

```typescript
const userMessage = "Hi, my name is Alice. My order ID is 12345, and I need help with a refund.";
const items = [
    { name: "name", description: "The user's name" },
    { name: "orderID", description: "The order ID mentioned in the message" },
];

const extractedData = await userMessage.extractData(items);
console.log(extractedData); 
// Output: { name: "Alice", orderID: "12345" }

const question = "What does the user need help with?";
const userNeed = await userMessage.question(question);
console.log(userNeed); 
// Output: "a refund"

const translatedMessage = await userMessage.translate("spanish");
console.log(translatedMessage);
// Output: "Hola, mi nombre es Alice. Mi ID de pedido es 12345 y necesito ayuda con un reembolso."
```

With just a few lines of code, you can build a robust AI-powered system to handle customer queries efficiently.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.  
