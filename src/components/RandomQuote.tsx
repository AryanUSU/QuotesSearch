import { ReactNode } from 'react';

interface RandomQuoteProps {
    children?: ReactNode;
    result: [];
}

export async function RandomQuote({children="", result}: RandomQuoteProps) {
    // const result = await fetch("https://api.quotable.io/random");
    // const resultJSON = await result.json();
    // const randomQuote = await resultJSON.content;
    // const randomAuthor = await resultJSON.author;
    
    return (
        <div>
            {/* {result.content}
            <div>
                - {result.author}
            </div> */}
        </div>
    );
}