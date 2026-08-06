export interface PaymentGatewayStatus {
  provider: "paystack" | "flutterwave" | "stripe" | "bank-transfer" | "enterprise-billing";
  name: string;
  enabled: boolean;
  currenciesSupported: string[];
  settlementAccount: string;
  transactionSuccessRate: number;
  lastWebhookReceived: string;
}

export class PaymentGatewayManager {
  static getGatewayStatuses(tenantId: string): PaymentGatewayStatus[] {
    return [
      { provider: "paystack", name: "Paystack Gateway Hub", enabled: true, currenciesSupported: ["NGN", "GHS", "USD", "ZAR"], settlementAccount: "**** **** 8821 (Access Bank)", transactionSuccessRate: 99.8, lastWebhookReceived: "Just now" },
      { provider: "flutterwave", name: "Flutterwave Pan-African Payments", enabled: true, currenciesSupported: ["NGN", "KES", "GHS", "UGX", "USD"], settlementAccount: "**** **** 4410 (Zenith Bank)", transactionSuccessRate: 98.4, lastWebhookReceived: "15 mins ago" },
      { provider: "stripe", name: "Stripe International Billing", enabled: false, currenciesSupported: ["USD", "EUR", "GBP"], settlementAccount: "Not Configured", transactionSuccessRate: 99.9, lastWebhookReceived: "N/A" },
      { provider: "bank-transfer", name: "Direct Bank Transfer & USSD", enabled: true, currenciesSupported: ["NGN"], settlementAccount: "DWSA Corporate Account 1029384756", transactionSuccessRate: 100.0, lastWebhookReceived: "1 hour ago" },
      { provider: "enterprise-billing", name: "Institutional Invoicing & PO", enabled: true, currenciesSupported: ["USD", "NGN"], settlementAccount: "Enterprise Ledger Direct", transactionSuccessRate: 100.0, lastWebhookReceived: "Daily Sync" },
    ];
  }
}
