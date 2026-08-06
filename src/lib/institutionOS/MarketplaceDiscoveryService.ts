export interface FeaturedCollection {
  id: string;
  title: string;
  subtitle: string;
  extensionIds: string[];
}

export class MarketplaceDiscoveryService {
  static getFeaturedCollections(): FeaturedCollection[] {
    return [
      { id: "col-01", title: "Top Campus Operations Extensions", subtitle: "Must-have tools for student housing, clinic, and library", extensionIds: ["ext-smart-hostel-mgr", "ext-library-rfid-sync"] },
      { id: "col-[#02]", title: "African Financial & Regulatory Suite", subtitle: "Tax compliance and local settlement integrations", extensionIds: ["ext-pan-african-tax"] },
    ];
  }
}
