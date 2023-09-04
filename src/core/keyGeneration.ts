import rsa from "js-crypto-rsa";
import keyutil from "js-crypto-key-utils";

/**
 * Function to generate key pairs
 * @returns Promise<{ privateKey: privateKeyPEM, pubicKey: publicKeyPEM }>
 */
const generateKeys = async () => {
  let { privateKey, publicKey } = await rsa.generateKey(2048);

  let keyObjPrivate = new keyutil.Key("jwk", privateKey);
  let keyObjPublic = new keyutil.Key("jwk", publicKey);

  const privateKeyPEM = (await keyObjPrivate.export("pem")).toString();
  const publicKeyPEM = (await keyObjPublic.export("pem")).toString();

  return {
    privateKey: privateKeyPEM,
    publicKey: publicKeyPEM,
  };
};

export { generateKeys };
