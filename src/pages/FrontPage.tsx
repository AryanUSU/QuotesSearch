import { SearchInput } from "../components/SearchInput";

export function FrontPage() {
    return (
        <main>
            <h1 className="center header">Quotes Search</h1>
            <form>
                <SearchInput></SearchInput>
            </form>
        </main>
    );
}