import { useEffect, useState } from "react";

interface Quote {
    _id: number;
    text: string;
}
let ID_COUNT = 0;

export function FrontPage() {
    const [input, setInput] = useState("")
    const [searched, setSearched] = useState(false)
    const [quotes, setQuotes] = useState<Quote[]>([])
    const [randomQuote, setRandomQuote] = useState("")
    const [randomAuthor, setRandomAuthor] = useState("")

    async function loadRandomQuote() {
        const result = await fetch("https://usu-quotes-mimic.vercel.app/api/random");
        const quote = await result.json();
        setRandomQuote(quote.content);
        setRandomAuthor(quote.author);
    }

    async function loadQuotes() {
        const result = await fetch(`https://usu-quotes-mimic.vercel.app/api/search?query=${input}`);
        const results = await result.json();
        const quotesArr = results.results;
        let finalArr = [];

        for (let i = 0; i < quotesArr.length; i++) {
            const tempQuote: Quote = {
                _id: ID_COUNT++,
                text: quotesArr[i].content
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
        console.log('hi');
        if (searched) {
            loadQuotes();
        }
    }, [searched]);

    return (
        <main>
            <h1 className="center header" hidden={searched}>Quotes Search</h1>
            {/* TODO: CHANGE THE CSS OF THE SECOND PAGE QUOTES */}
            <h1 className="center header" hidden={!searched}>Quotes Search</h1>

            <form onSubmit={e => e.preventDefault()}>
                <div className="center">
                    <label>
                        <input type="text" value={input} placeholder="George Washington" 
                        onChange={e => setInput(e.target.value)} 
                        onKeyDown={e => {
                            if (e.key === 'Enter') {
                                if (input.length > 0) {
                                    setSearched(false);
                                    console.log('hello');
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
                        <div className="center quote" key={quote._id}>
                            {quote.text}
                        </div>
                    )
                }
            </div>
        </main>
    );
}