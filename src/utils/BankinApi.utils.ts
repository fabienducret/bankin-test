export const encodeBase64 = (valueToEncode: string) => {
  let encodedValue = '';

  if (valueToEncode) {
    encodedValue = Buffer.from(valueToEncode).toString('base64');
  }

  return encodedValue;
};
