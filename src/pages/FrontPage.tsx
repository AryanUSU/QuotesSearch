import { useEffect, useState } from "react";

interface Quotes {
    id: number;
    text: string;
}

export function FrontPage() {
    const [input, setInput] = useState("")
    const [searched, setSearched] = useState(false)
    const [quotes, setQuotes] = useState<Quotes[]>([])
    const [randomQuote, setRandomQuote] = useState("")
    const [randomAuthor, setRandomAuthor] = useState("")

    useEffect( () => {
        fetch("https://usu-quotes-mimic.vercel.app/api/random").then(res => res.json())
        .then(quote => {
            setRandomQuote(quote.content);
            setRandomAuthor(quote.author);
        });
    }, []);

    useEffect( () => {
        if (searched) {
            fetch(`https://usu-quotes-mimic.vercel.app/api/search?query=${input}`)
            .then(res => res.json()).then(quotes => {
                const quotesArr = quotes.results;
                setQuotes(quotes.results.map((quote) => quote.content));
            });
        }
    }, [searched]);

    return (
        <main>
            <h1 className="center header" hidden={searched}>Quotes Search</h1>
            {/* TODO: CHANGE THE CSS OF THE SECOND PAGE QUOTES */}
            <h1 className="header" hidden={!searched}>Quotes Search</h1>

            <form onSubmit={e => e.preventDefault()}>
                <div className="center">
                    <label>
                        <input type="text" value={input} placeholder="George Washington" 
                        onChange={e => setInput(e.target.value)} 
                        onKeyDown={e => {
                            if (e.key === 'Enter') {
                                // setQuotes([{id: 1, text: 'hello'}])
                                if (input.length > 0) {
                                    setSearched(true);
                                }
                            }
                        }}/>
                    </label>
                </div>
            </form>

            <div className="center" hidden={searched}>
                {randomQuote}
                <div hidden={randomAuthor === ''}>
                    - {randomAuthor}
                </div>
                <div hidden={randomAuthor !== ''}>
                    - Anon
                </div>
            </div>

            <div className="center" hidden={!searched}>
                {
                    quotes.map((quote) =>
                        <div key={quote.id}>
                            {quote.text}
                        </div>
                    )
                }
            </div>
        </main>
    );
}