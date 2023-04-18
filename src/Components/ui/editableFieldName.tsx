import { useState } from "react";

type EditableLabelProps = {
    text: string;
    onChange: (newText: string) => void;
};

const EditableLabel = ({ text, onChange }: EditableLabelProps) => {
    const [editing, setEditing] = useState(false);
    const [currentText, setCurrentText] = useState(text);

    const handleDoubleClick = () => {
        setEditing(true);
    };

    const handleBlur = () => {
        setEditing(false);
        onChange(currentText);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            setEditing(false);
            onChange(currentText);
        } else if (event.key === "Escape") {
            setEditing(false);
            setCurrentText(text);
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentText(event.target.value);
    };

    return (
        <div className="inline"
            onClick={handleDoubleClick}>
            {editing ? (
                <input
                    type="text"
                    value={currentText}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    className='p-1 w-24 '
                    autoFocus
                />
            ) : (
                <span>{text}</span>
            )}
        </div>
    );
};

export default EditableLabel;
