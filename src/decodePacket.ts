import { PacketEncoder } from "./createPacket";

export class PacketDecoder {
    static decode(buffer: Uint8Array): { type: number; version: number; payload: Uint8Array } {
        const dataView = new DataView(buffer.buffer);

        // Decode header
        const signature = dataView.getUint32(0, true);
        if (signature !== 0x7A626C6D) {
            throw new Error("Invalid packet signature");
        }

        const type = dataView.getUint32(PacketEncoder.SIGNATURE_LENGTH, true);
        const version = dataView.getUint16(PacketEncoder.SIGNATURE_LENGTH + PacketEncoder.TYPE_LENGTH, true);
        const packetSize = dataView.getBigUint64(PacketEncoder.SIGNATURE_LENGTH + PacketEncoder.TYPE_LENGTH + PacketEncoder.VERSION_LENGTH, true);

        if (packetSize !== BigInt(buffer.length)) {
            throw new Error("Packet size mismatch");
        }

        // Extract payload
        const payload = buffer.slice(PacketEncoder.HEADER_LENGTH);

        return { type, version, payload };
    }
}
