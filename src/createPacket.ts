export class PacketEncoder {
    static SIGNATURE_LENGTH = 4; // Signature length
    static TYPE_LENGTH = 4;      // Packet type length
    static VERSION_LENGTH = 2;   // Version length
    static SIZE_LENGTH = 8;      // Packet size length
    static HEADER_LENGTH = PacketEncoder.SIGNATURE_LENGTH + PacketEncoder.TYPE_LENGTH + PacketEncoder.VERSION_LENGTH + PacketEncoder.SIZE_LENGTH;
    static CURRENT_SUPPORTED_VERSION = 1; // Protocol version

    static encode(type: number, payload: Uint8Array): Uint8Array {
        const packetSize = this.HEADER_LENGTH + payload.length;

        // Buat buffer untuk header + payload
        const buffer = new Uint8Array(packetSize);
        const dataView = new DataView(buffer.buffer);

        // Encode header
        dataView.setUint32(0, 0x7A626C6D, true); // Signature
        dataView.setUint32(this.SIGNATURE_LENGTH, type, true); // Packet type
        dataView.setUint16(this.SIGNATURE_LENGTH + this.TYPE_LENGTH, this.CURRENT_SUPPORTED_VERSION, true); // Version
        dataView.setBigUint64(this.SIGNATURE_LENGTH + this.TYPE_LENGTH + this.VERSION_LENGTH, BigInt(packetSize), true); // Packet size

        // Copy payload ke buffer
        buffer.set(payload, this.HEADER_LENGTH);

        return buffer;
    }
}
