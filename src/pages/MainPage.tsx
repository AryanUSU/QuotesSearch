import { SearchInput } from "../components/SearchInput";

export function MainPage() {
    return (
        <main>
            <h1>Quotes Search</h1>
            <form>
                <SearchInput></SearchInput>
            </form>
        </main>
    );
}