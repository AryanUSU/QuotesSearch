import { ReactNode } from 'react';

interface SearchInputProps {
    children?: ReactNode;
}

export function SearchInput({children=""}: SearchInputProps) {
    return (
        <div className="flex-input">
            <label>
                <input type="text" />
            </label>
        </div>
    );
}