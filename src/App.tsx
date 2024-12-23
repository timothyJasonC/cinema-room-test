// import './App.css'
import CinemaRoom from './Room'

function App() {
  // const data = {
  //   cinema_id: 2,
  //   type: 'Regular 2D',
  //   total_seats: 20,
  //   map_seat: {
  //     availableSeats: [
  //       "E1", "E2", "E3", "E4", "E5", "E6",
  //       "D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8",
  //       "C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8",
  //       "B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8",
  //       "A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8"
  //     ],
  //     cols: 8,
  //     layout: [
  //       { row: "E", col: 1, displayCol: 0 },
  //       { row: "E", col: 2, displayCol: 0 },
  //       { row: "E", col: 3, displayCol: 1 },
  //       { row: "E", col: 4, displayCol: 2 },
  //       { row: "E", col: 5, displayCol: 3 },
  //       { row: "E", col: 6, displayCol: 4 },
  //       { row: "E", col: 7, displayCol: 5 },
  //       { row: "E", col: 8, displayCol: 6 },
  //       { row: "D", col: 1, displayCol: 1 },
  //       { row: "D", col: 2, displayCol: 2 },
  //       { row: "D", col: 3, displayCol: 3 },
  //       { row: "D", col: 4, displayCol: 4 },
  //       { row: "D", col: 5, displayCol: 5 },
  //       { row: "D", col: 6, displayCol: 6 },
  //       { row: "D", col: 7, displayCol: 7 },
  //       { row: "D", col: 8, displayCol: 8 },
  //       { row: "C", col: 1, displayCol: 1 },
  //       { row: "C", col: 2, displayCol: 2 },
  //       { row: "C", col: 3, displayCol: 3 },
  //       { row: "C", col: 4, displayCol: 4 },
  //       { row: "C", col: 5, displayCol: 5 },
  //       { row: "C", col: 6, displayCol: 6 },
  //       { row: "C", col: 7, displayCol: 7 },
  //       { row: "C", col: 8, displayCol: 8 },
  //       { row: "B", col: 1, displayCol: 1 },
  //       { row: "B", col: 2, displayCol: 2 },
  //       { row: "B", col: 3, displayCol: 3 },
  //       { row: "B", col: 4, displayCol: 4 },
  //       { row: "B", col: 5, displayCol: 5 },
  //       { row: "B", col: 6, displayCol: 6 },
  //       { row: "B", col: 7, displayCol: 7 },
  //       { row: "B", col: 8, displayCol: 8 },
  //       { row: "A", col: 1, displayCol: 1 },
  //       { row: "A", col: 2, displayCol: 2 },
  //       { row: "A", col: 3, displayCol: 3 },
  //       { row: "A", col: 4, displayCol: 4 },
  //       { row: "A", col: 5, displayCol: 5 },
  //       { row: "A", col: 6, displayCol: 6 },
  //       { row: "A", col: 7, displayCol: 7 },
  //       { row: "A", col: 8, displayCol: 8 }
  //     ],
  //     removedSeats: ["E1", "E2"],
  //     rows: 5
  //   },
  //   price: 35000,
  //   prime_price: 50000
  // }


  // const sendData = () => {
  //   const data = {
  //     cinema_id: 2,
  //     type: 'Regular 2D',
  //     total_seats: 20,
  //     map_seat: cinemaData,
  //     price: 35000,
  //     prime_price: 50000
  //   }

  //   console.log(data);
    
  //   // const encoder = new TextEncoder();
  //   // const payload = encoder.encode(JSON.stringify(data));
  //   // const type = 2; // Misalnya tipe paket DATA

  //   // // Encode packet
  //   // const encodedPacket = PacketEncoder.encode(type, payload);

  //   // // Decode packet
  //   // const decodedPacket = PacketDecoder.decode(encodedPacket);
  //   // // console.log('decodedd paket lokal', decodedPacket);


  //   // // Convert Uint8Array payload back to JSON string
  //   // const payloadArray = Array.from(decodedPacket.payload);

  //   // // Fix: Use Uint8Array for decoding
  //   // const decoder = new TextDecoder();
  //   // const decoded = decoder.decode(new Uint8Array(payloadArray));
  //   // console.log("Decoded Payload:", decoded);

  //   // axios.post("http://127.0.0.1:8080/api/v1/room", encodedPacket, {
  //   //   headers: {
  //   //     "Content-Type": "application/octet-stream"
  //   //   },
  //   //   responseType: "arraybuffer" // Penting untuk menerima data biner
  //   // }).then(response => {
  //   //   // Menerima respons binary dari backend
  //   //   const responseBinary = new Uint8Array(response.data);

  //   //   // Decode respons menggunakan PacketDecoder
  //   //   const decodedPacket = PacketDecoder.decode(responseBinary);
  //   //   const payloadArray = Array.from(decodedPacket.payload);
  //   //   const decoder = new TextDecoder();
  //   //   const decoded = decoder.decode(new Uint8Array(payloadArray));
  //   //   // console.log("Decoded Payload:", decoded);


  //   //   console.log("Decoded Packet from Backend:", decoded);
  //   // }).catch(error => {
  //   //   console.error("Error:", error);
  //   // });
  // }
  return (
    <>
      {/* <button onClick={sendData}>Test</button> */}
      <CinemaRoom/>
    </>
  )
}

export default App
