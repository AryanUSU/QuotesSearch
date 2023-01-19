import { ReactNode } from 'react';

interface SearchInputProps {
    children?: ReactNode;
}

export function SearchInput({children=""}: SearchInputProps) {
    return (
        <div className="center">
            <label>
                <input type="text" />
            </label>
        </div>
    );
}