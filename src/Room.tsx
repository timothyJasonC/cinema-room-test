import { useState } from "react";
import CinemaPreview from "./CinemaPreview";
import { PacketDecoder } from "./decodePacket";
import axios from "axios";
import { PacketEncoder } from "./createPacket";

const CinemaRoom = () => {
  const [rows, setRows] = useState<number>(5); // Default number of rows
  const [cols, setCols] = useState<number>(8); // Default number of columns
  const [removedSeats, setRemovedSeats] = useState<string[]>([]); // Store seats to remove
  const [submittedData, setSubmittedData] = useState<any>(null); // Data for preview

  // Generate the seat layout dynamically
  const generateSeats = (): { row: string; col: number; displayCol: number }[] => {
    const seats: { row: string; col: number; displayCol: number }[] = [];
    for (let i = rows - 1; i >= 0; i--) {
      const rowLabel: string = String.fromCharCode(65 + i); // Convert index to letter (A, B, C...)
      let visibleCount = 1; // Counter for visible seats only
      for (let j = 1; j <= cols; j++) {
        const seatKey: string = `${rowLabel}${j}`;
        if (!removedSeats.includes(seatKey)) {
          seats.push({ row: rowLabel, col: j, displayCol: visibleCount });
          visibleCount++;
        } else {
          seats.push({ row: rowLabel, col: j, displayCol: 0 }); // Placeholder for removed seat
        }
      }
    }
    return seats;
  };

  const seats = generateSeats();

  const toggleSeat = (seat: string): void => {
    setRemovedSeats((prev: string[]) =>
      prev.includes(seat) ? prev.filter((s: string) => s !== seat) : [...prev, seat]
    );
  };

  const handleSubmit = () => {
    // Filter available seats (displayCol > 0)
    const availableSeats = seats
      .filter((seat) => seat.displayCol > 0)
      .map((seat) => `${seat.row}${seat.displayCol}`); // Format seat codes

    const data = {
      rows,
      cols,
      removedSeats,
      layout: seats,
      availableSeats
    };

    const cinemaData = {
      cinema_id: 2,
      type: 'Regular 2D',
      total_seats: 20,
      map_seat: data,
      price: 35000,
      prime_price: 50000
    }

    console.log(cinemaData);
    

    const encoder = new TextEncoder();
    const payload = encoder.encode(JSON.stringify(cinemaData));
    const type = 2; // Misalnya tipe paket DATA

    // Encode packet
    const encodedPacket = PacketEncoder.encode(type, payload);

    // Decode packet
    const decodedPacket = PacketDecoder.decode(encodedPacket);
    // console.log('decodedd paket lokal', decodedPacket);


    // Convert Uint8Array payload back to JSON string
    const payloadArray = Array.from(decodedPacket.payload);

    // Fix: Use Uint8Array for decoding
    const decoder = new TextDecoder();
    const decoded = decoder.decode(new Uint8Array(payloadArray));
    console.log("Decoded Payload:", decoded);

    axios.post("http://127.0.0.1:8080/api/v1/room", encodedPacket, {
      headers: {
        "Content-Type": "application/octet-stream"
      },
      responseType: "arraybuffer" // Penting untuk menerima data biner
    }).then(response => {
      // Menerima respons binary dari backend
      const responseBinary = new Uint8Array(response.data);

      // Decode respons menggunakan PacketDecoder
      const decodedPacket = PacketDecoder.decode(responseBinary);
      const payloadArray = Array.from(decodedPacket.payload);
      const decoder = new TextDecoder();
      const decoded = decoder.decode(new Uint8Array(payloadArray));
      // console.log("Decoded Payload:", decoded);


      console.log("Decoded Packet from Backend:", decoded);
    }).catch((error: any) => {
      console.error("Error:", error);
    });

    console.log("Cinema Data:", data);
    setSubmittedData(data); // Pass data to the preview component
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Cinema Room Creator</h1>

      {/* Controls to adjust rows and columns */}
      <div style={{ marginBottom: "20px" }}>
        <label>
          Rows:
          <input
            type="number"
            min="1"
            value={rows}
            onChange={(e) => setRows(parseInt(e.target.value) || 1)}
            style={{ margin: "0 10px" }}
          />
        </label>
        <label>
          Columns:
          <input
            type="number"
            min="1"
            value={cols}
            onChange={(e) => setCols(parseInt(e.target.value) || 1)}
            style={{ margin: "0 10px" }}
          />
        </label>
      </div>

      {/* Cinema seats layout */}
      <div style={{ display: "flex", flexDirection: "column", marginBottom: "20px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${cols}, 50px)`,
            gap: "10px",
            marginBottom: "10px",
          }}
        >
          {seats.map((seat) => (
            <div
              key={`${seat.row}${seat.col}`}
              onClick={() => toggleSeat(`${seat.row}${seat.col}`)}
              style={{
                width: "50px",
                height: "50px",
                backgroundColor: removedSeats.includes(`${seat.row}${seat.col}`) ? "transparent" : "#ccc",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "4px",
                border: removedSeats.includes(`${seat.row}${seat.col}`) ? "1px dashed #888" : "none",
                cursor: "pointer",
              }}
            >
              {seat.displayCol > 0 ? `${seat.row}${seat.displayCol}` : ""}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "center", padding: "10px", background: "#333", color: "white" }}>
          Movie Panel
        </div>
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        style={{
          padding: "10px 20px",
          backgroundColor: "#1fb897",
          color: "#fff",
          border: "none",
          cursor: "pointer",
          borderRadius: "5px",
        }}
      >
        Submit
      </button>

      {/* Cinema Preview */}
      {submittedData && <CinemaPreview data={submittedData} />}
    </div>
  );
};

export default CinemaRoom;
