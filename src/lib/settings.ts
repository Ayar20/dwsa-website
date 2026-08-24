import { prisma } from "@/lib/prisma";

export interface SystemPricingConfig {
  standardPrice: number;
  earlyBirdPrice: number;
  earlyBirdSeats: number;
  earlyBirdActive: boolean;
  paystackCheckoutUrl: string;
}

export const DEFAULT_PRICING_CONFIG: SystemPricingConfig = {
  standardPrice: 55000,
  earlyBirdPrice: 45000,
  earlyBirdSeats: 5,
  earlyBirdActive: true,
  paystackCheckoutUrl: "https://checkout.paystack.com/brihlvap5ybeaww",
};

export async function getSystemPricingConfig(): Promise<SystemPricingConfig> {
  try {
    const settings = await prisma.systemSetting.findMany({
      where: {
        key: {
          in: [
            "cohort_standard_price",
            "cohort_early_bird_price",
            "cohort_early_bird_seats",
            "cohort_early_bird_active",
            "cohort_paystack_url",
          ],
        },
      },
    });

    const map = new Map<string, string>();
    for (const s of settings) {
      map.set(s.key, s.value);
    }

    return {
      standardPrice: map.has("cohort_standard_price")
        ? Number(map.get("cohort_standard_price")) || DEFAULT_PRICING_CONFIG.standardPrice
        : DEFAULT_PRICING_CONFIG.standardPrice,
      earlyBirdPrice: map.has("cohort_early_bird_price")
        ? Number(map.get("cohort_early_bird_price")) || DEFAULT_PRICING_CONFIG.earlyBirdPrice
        : DEFAULT_PRICING_CONFIG.earlyBirdPrice,
      earlyBirdSeats: map.has("cohort_early_bird_seats")
        ? Number(map.get("cohort_early_bird_seats")) || DEFAULT_PRICING_CONFIG.earlyBirdSeats
        : DEFAULT_PRICING_CONFIG.earlyBirdSeats,
      earlyBirdActive: map.has("cohort_early_bird_active")
        ? map.get("cohort_early_bird_active") === "true"
        : DEFAULT_PRICING_CONFIG.earlyBirdActive,
      paystackCheckoutUrl:
        map.get("cohort_paystack_url") || DEFAULT_PRICING_CONFIG.paystackCheckoutUrl,
    };
  } catch (error) {
    console.error("Failed to read system pricing config from DB, using defaults:", error);
    return DEFAULT_PRICING_CONFIG;
  }
}

export async function updateSystemPricingConfig(config: Partial<SystemPricingConfig>): Promise<SystemPricingConfig> {
  const updates: { key: string; value: string }[] = [];

  if (config.standardPrice !== undefined) {
    updates.push({ key: "cohort_standard_price", value: String(config.standardPrice) });
  }
  if (config.earlyBirdPrice !== undefined) {
    updates.push({ key: "cohort_early_bird_price", value: String(config.earlyBirdPrice) });
  }
  if (config.earlyBirdSeats !== undefined) {
    updates.push({ key: "cohort_early_bird_seats", value: String(config.earlyBirdSeats) });
  }
  if (config.earlyBirdActive !== undefined) {
    updates.push({ key: "cohort_early_bird_active", value: String(config.earlyBirdActive) });
  }
  if (config.paystackCheckoutUrl !== undefined) {
    updates.push({ key: "cohort_paystack_url", value: config.paystackCheckoutUrl });
  }

  for (const item of updates) {
    await prisma.systemSetting.upsert({
      where: { key: item.key },
      update: { value: item.value },
      create: { key: item.key, value: item.value },
    });
  }

  return getSystemPricingConfig();
}
