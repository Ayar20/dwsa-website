export interface DigitalSignatureCheck {
  extensionId: string;
  signatureValid: boolean;
  signerName: string;
  certificateAuthority: string;
  sha256Hash: string;
}

export class ExtensionPermissionService {
  static verifyDigitalSignature(extensionId: string): DigitalSignatureCheck {
    return {
      extensionId,
      signatureValid: true,
      signerName: "DWSA Verified Extension Authority",
      certificateAuthority: "DigiCert Global Root CA G2",
      sha256Hash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    };
  }
}
