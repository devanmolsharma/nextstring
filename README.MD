# nextstring

nextstring is a powerful TypeScript library that extends the native `String` prototype with AI-driven capabilities. It allows developers to perform advanced operations on strings, such as extracting data, answering questions, summarizing text, and checking conditions, all powered by a configurable AI provider.

## Features

- **Extract Data**: Extract specific information from a string based on descriptions.
- **Answer Questions**: Answer questions using the context of the string.
- **Summarize**: Summarize text to a specified number of words.
- **Check Conditions**: Evaluate conditions based on the string's content.

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

## Impact on AI Coding

nextstring simplifies the integration of AI capabilities into your applications by abstracting complex AI interactions into intuitive string methods. This allows developers to:

- Focus on building features rather than implementing AI logic.
- Leverage AI for natural language processing tasks with minimal effort.
- Enhance productivity and reduce boilerplate code.

## Sample Scenario: AI-Powered Customer Support

Imagine you're building a customer support chatbot. With nextstring, you can easily extract key information from user messages, answer their questions, and summarize lengthy responses.

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
```

With just a few lines of code, you can build a robust AI-powered system to handle customer queries efficiently.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.  
