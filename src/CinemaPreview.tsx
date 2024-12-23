import React, { useState } from "react";

interface CinemaPreviewProps {
    data: {
        rows: number;
        cols: number;
        removedSeats: string[];
        layout: { row: string; col: number; displayCol: number }[];
    };
}

const CinemaPreview: React.FC<CinemaPreviewProps> = ({ data }) => {
    const { rows, cols, removedSeats, layout } = data;
    const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

    const toggleSeatSelection = (seat: string) => {
        if (selectedSeats.includes(seat)) {
            setSelectedSeats(selectedSeats.filter((s) => s !== seat));
        } else {
            setSelectedSeats([...selectedSeats, seat]);
        }
    };

    const handlePurchase = () => {
        console.log("Purchased Seats:", selectedSeats);
        alert(`Purchased Seats: ${selectedSeats.join(", ")}`);
    };

    return (
        <div style={{ marginTop: "20px", padding: "20px", border: "1px solid #ddd" }}>
            <h2>Preview Cinema Layout</h2>
            <p>
                Rows: {rows}, Columns: {cols}
            </p>
            <p>Removed Seats: {removedSeats.join(", ") || "None"}</p>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: `repeat(${cols}, 50px)`,
                    gap: "10px",
                }}
            >
                {layout.map((seat) => {
                    const seatKey = `${seat.row}${seat.displayCol}`;
                    let bgColor = "#ccc"
                    let isDisabled = false;
                    if (removedSeats.includes(`${seat.row}${seat.col}`)) {
                        bgColor = "transparent";
                        isDisabled = true;
                    } else if (selectedSeats.includes(seatKey)) {
                        bgColor = "#4caf50"; 
                    }

                    return (
                        <button
                            key={`${seat.row}${seat.col}`}
                            onClick={() => toggleSeatSelection(`${seat.row}${seat.displayCol}`)}
                            style={{
                                width: "50px",
                                height: "50px",
                                backgroundColor: bgColor,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: "4px",
                                cursor: isDisabled ? "default" : "pointer",
                            }}
                            disabled={isDisabled} 
                        >
                            {seat.displayCol > 0 ? `${seat.row}${seat.displayCol}` : ""}
                        </button>
                    )
                })}
            </div>
            <button
                onClick={handlePurchase}
                style={{
                    marginTop: "10px",
                    padding: "10px 20px",
                    backgroundColor: "#1fb897",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                }}
            >
                Purchase
            </button>
        </div>
    );
};

export default CinemaPreview;
