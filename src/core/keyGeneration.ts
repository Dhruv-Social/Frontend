import crypto from "crypto";

const generateKeys = () => {
  const keyPair = crypto.generateKeyPairSync("rsa", {
    modulusLength: 530,
    publicKeyEncoding: {
      type: "spki",
      format: "pem",
    },
    privateKeyEncoding: {
      type: "pkcs8",
      format: "pem",
      cipher: "aes-256-cbc",
      passphrase: "",
    },
  });
  return {
    publicKey: keyPair.publicKey,
    privateKey: keyPair.privateKey,
  };
};

export { generateKeys };
