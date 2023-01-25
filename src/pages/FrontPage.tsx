import { useEffect, useState } from "react";

interface Quote {
    _id: number;
    text: string;
    author: string;
}
let ID_COUNT = 0;

export function FrontPage() {
    const [input, setInput] = useState("");
    const [searched, setSearched] = useState(false);
    const [secondPage, setSecondPage] = useState(false);
    const [quotes, setQuotes] = useState<Quote[]>([]);
    const [randomQuote, setRandomQuote] = useState<Quote | null>(null);

    // Async function to grab random quote on site start
    async function loadRandomQuote() {
        const result = await fetch("https://usu-quotes-mimic.vercel.app/api/random");
        const quote = await result.json();
        const tempQuote: Quote = {
            _id: ID_COUNT++,
            text: quote.content,
            author: quote.author
        }
        setRandomQuote(tempQuote);
    }

    // Async function to grab quotes from searched author name
    async function loadQuotes() {
        const result = await fetch(`https://usu-quotes-mimic.vercel.app/api/search?query=${input}`);
        const results = await result.json();
        const quotesArr = results.results;
        let finalArr = [];

        for (let i = 0; i < quotesArr.length; i++) {
            const tempQuote: Quote = {
                _id: ID_COUNT++,
                text: quotesArr[i].content,
                author: quotesArr[i].author
            };
            finalArr.push(tempQuote);
        }
        setQuotes(finalArr);
    }

    // Effect to get random quote on website start
    useEffect( () => {
        loadRandomQuote();
    }, []);

    // Effect to search for quotes by author
    useEffect( () => {
        if (searched) {
            setSecondPage(true);
            loadQuotes();
            setSearched(false);
        }
    }, [searched]);

    return (
        <main>
            <h1 className="center header" hidden={secondPage}>Quotes Search</h1>
            <h1 className="center" hidden={!secondPage}>Quotes Search</h1>

            <form onSubmit={e => e.preventDefault()}>
                <div className="center">
                    <label>
                        <input type="text" value={input} placeholder="George Washington" 
                        onChange={e => setInput(e.target.value)} 
                        onKeyDown={e => {
                            if (e.key === 'Enter') {
                                if (input.length > 0) {
                                    setSearched(true);
                                }
                            }
                        }}/>
                    </label>
                </div>
            </form>

            <div className="center random-quote" hidden={secondPage}>
                {randomQuote?.text}
                <div hidden={randomQuote?.author === ''}>
                    - {randomQuote?.author}
                </div>

                <div hidden={randomQuote?.author !== ''}>
                    - Anon
                </div>
            </div>

            <div className="center" hidden={!secondPage}>
                {
                    quotes.map((quote) =>
                        <div className="center quote" key={quote._id}>
                            {quote.text}
                        </div>
                    )
                }
            </div>
        </main>
    );
}