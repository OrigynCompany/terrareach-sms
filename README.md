# @origyns/terrareach-sms

[![npm version](https://img.shields.io/npm/v/@origyns/terrareach-sms.svg)](https://www.npmjs.com/package/@origyns/terrareach-sms)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue)

The official Node.js SDK for the [TerraReach SMS API](https://docs.terrareach.com) by ORIGYN. Effortlessly send single SMS, bulk messages, and monitor your account balance with built-in validation.

---

## 🚀 Features

- **Type-Safe**: Written in TypeScript with full IntelliSense support.
- **Fail-Fast Validation**: Uses Zod to validate payloads locally before hitting the network.
- **Account Monitoring**: Check your balance and usage stats programmatically.
- **Promise-based**: Works seamlessly with `async/await`.
- **Zero Configuration**: Sensible defaults to get you up and running in seconds.
- **Official SDK**: Maintained and supported by ORIGYN.

---

## 📦 Installation
```bash
npm install @origyns/terrareach-sms
# or
yarn add @origyns/terrareach-sms
```

---

## 🛠️ Quick Start

### 1. Initialize the Client

Get your API key from the [TerraReach API Key](https://app.terrareach.com/settings/api-keys).
```javascript
const { TerraReach } = require('@origyns/terrareach-sms');

const client = new TerraReach('your_api_key_here');
```

### 2. Send a Single SMS

The library validates your input (e.g., ensuring the phone number contains only digits) before sending the request.
```javascript
async function sendAlert() {
  try {
    const response = await client.sendSMS({
      mask: 'MYCOMPANY',
      message: 'Your verification code is 5542',
      phoneNumber: '94771234567'
    });
    
    console.log('SMS Sent Successfully. ID:', response.id);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

sendAlert();
```

### 3. Send Bulk SMS

Send the same message to multiple recipients in a single API call.
```javascript
await client.sendBulkSMS({
  mask: 'ALERTS',
  message: 'System maintenance scheduled for tonight at 10 PM.',
  phoneNumbers: ['94771234567', '94777654321', '94112223344']
});
```

### 4. Check Account Stats

Monitor your remaining balance and total message count.
```javascript
async function checkAccount() {
  try {
    const stats = await client.getStats();
    
    console.log('--- Account Summary ---');
    console.log(`Balance: ${stats.balance}`);
    console.log(`Total Sent: ${stats.totalSent}`);
    
    if (stats.balance < 10) {
      console.warn('⚠️ Warning: Your TerraReach balance is running low!');
    }
  } catch (error) {
    console.error('Failed to fetch stats:', error.message);
  }
}

checkAccount();
```

---

## 📖 API Reference

### `new TerraReach(apiKey)`

| Parameter | Type     | Description                       |
|-----------|----------|-----------------------------------|
| `apiKey`  | `string` | **Required.** Your TerraReach API key. |

---

### `.sendSMS(options)`

| Option        | Type     | Description                                              |
|---------------|----------|----------------------------------------------------------|
| `mask`        | `string` | Your approved Sender ID / Mask.                          |
| `message`     | `string` | The text content of the SMS.                             |
| `phoneNumber` | `string` | Recipient number (digits only, include country code).    |

**Returns:** `Promise<SendSMSResponse>`

---

### `.sendBulkSMS(options)`

| Option         | Type       | Description                              |
|----------------|------------|------------------------------------------|
| `mask`         | `string`   | Your approved Sender ID / Mask.          |
| `message`      | `string`   | The text content of the SMS.             |
| `phoneNumbers` | `string[]` | Array of recipient phone numbers.        |

**Returns:** `Promise<BulkSMSResponse>`

---

### `.getStats()`

Fetches account information and remaining credit balance.

**Returns:** `Promise<StatsResponse>`

**Response Example:**
```json
{
  "balance": 250.50,
  "totalSent": 1523
}
```

---

## 🚦 Error Handling

The library distinguishes between local validation errors (Zod) and remote API errors.
```javascript
try {
  await client.sendSMS({
    mask: 'MYCOMPANY',
    message: 'Test message',
    phoneNumber: '94771234567'
  });
} catch (error) {
  // Catching local validation or API errors
  console.error('[TerraReach SDK Error]:', error.message);
}
```

### Common Errors

- **Validation Error**: Invalid input format (e.g., phone number contains non-digits)
- **API Error**: Authentication failure, insufficient balance, or network issues
- **Network Error**: Connection timeout or unreachable API endpoint

---

## 🔧 TypeScript Usage

The library is written in TypeScript and provides full type definitions out of the box.
```typescript
import { TerraReach, SendSMSOptions, StatsResponse } from '@origyns/terrareach-sms';

const client = new TerraReach(process.env.TERRAREACH_API_KEY!);

const options: SendSMSOptions = {
  mask: 'MYCOMPANY',
  message: 'Hello from TypeScript!',
  phoneNumber: '94771234567'
};

async function sendMessage() {
  const response = await client.sendSMS(options);
  console.log(response.id);
}
```

---

## 🧪 Testing
```bash
npm test
```

---

## 🤝 Contributing

We welcome contributions! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📞 Support

- **Documentation**: [TerraReach API Docs](https://docs.terrareach.com)
- **Issues**: [GitHub Issues](https://github.com/OrigynCompany/terrareach-sms/issues)
- **Email**: support@terrareach.com
- **Website**: [terrareach.com](https://terrareach.com)

---

## About ORIGYN

TerraReach is proudly developed and maintained by [ORIGYN](https://origyn.company), a B2B SaaS product development company.

---

Made with ❤️ by ORIGYN