import type React from "react";
import "./LineNumbers.scss";

interface LineNumbersProps {
	lineCount: number;
}

export const LineNumbers: React.FC<LineNumbersProps> = ({ lineCount }) => {
    return (
        <div className="line-numbers">
            {Array.from({ length: lineCount }, (_, index) => (
                <div key={`line-${index + 1}`}>{index + 1}</div>
            ))}
        </div>
    );
};