export interface SDKManifest {
  manifestVersion: string;
  extensionId: string;
  name: string;
  version: string;
  entryPoint: string;
  sandboxMode: "STRICT" | "PERMISSIVE" | "ISOLATED";
  supportedHostVersions: string[];
  requiredAPIs: string[];
}

export class ExtensionSDKService {
  static getSDKVersion(): string {
    return "v4.4.0-sdk";
  }

  static generateManifestTemplate(extensionName: string): SDKManifest {
    return {
      manifestVersion: "1.0",
      extensionId: `ext-${extensionName.toLowerCase().replace(/\s+/g, "-")}`,
      name: extensionName,
      version: "1.0.0",
      entryPoint: "index.js",
      sandboxMode: "STRICT",
      supportedHostVersions: [">=4.0.0"],
      requiredAPIs: ["institutionOS.students.read", "institutionOS.analytics.push"],
    };
  }
}
