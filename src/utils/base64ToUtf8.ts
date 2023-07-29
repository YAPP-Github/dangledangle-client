export function base64ToUtf8(base64: string) {
  if (!process) {
    let binaryString = window.atob(base64);
    let decoder = new TextDecoder();
    return decoder.decode(
      new Uint8Array(binaryString.split('').map(ch => ch.charCodeAt(0)))
    );
  }

  if (Buffer) {
    let buffer = Buffer.from(base64, 'base64');
    return buffer.toString('utf-8');
  }

  return ``;
}
