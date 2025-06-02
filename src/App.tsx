import { useState, useEffect } from "react";

const quotes = [
  "Believe in yourself and all that you are.",
  "You are capable of amazing things.",
  "Every day is a second chance.",
  "Push yourself, because no one else is going to do it for you.",
  "Don't watch the clock; do what it does. Keep going.",
  "You don’t have to be great to start, but you have to start to be great.",
  "Small steps every day lead to big results.",
  "You are stronger than you think.",
  "Success is the sum of small efforts, repeated day in and day out.",
  "Dream it. Wish it. Do it.",
];

function App() {
  const [name, setName] = useState<string>("");
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [message, setMessage] = useState<string>("");
  const [quote, setQuote] = useState<string>("");
  const [counter, setCounter] = useState<number>(0);
  const [intervalId, setIntervalId] = useState<number | null>(null);
  const [hasStarted, setHasStarted] = useState<boolean>(false);

  useEffect(() => {
    if (timeLeft === 0) {
      clearInterval(intervalId!);
      setIntervalId(null);
      setTimeLeft(null);
      setCounter(counter + 1);
      setMessage(
        `You did it, ${name}! You've completed the timer ${counter} times!`
      );
      showRandomQuote();
    }
  }, [timeLeft, intervalId, name]);

  useEffect(() => {
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [intervalId]);

  const showRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setMessage("");
    setQuote("");
    setTimeLeft(null);
    setHasStarted(false);
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  const startTimer = () => {
    if (!name.trim()) return;

    setMessage("");
    setQuote("");
    setTimeLeft(10);
    setHasStarted(true);

    const id = window.setInterval(() => {
      setTimeLeft((prev) => (prev !== null ? prev - 1 : null));
    }, 1000);

    setIntervalId(id);
  };

  const resetAll = () => {
    setName("");
    setTimeLeft(null);
    setMessage("");
    setQuote("");
    setHasStarted(false);
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-black px-4">
      <div className="text-center w-full max-w-sm">
        <h1 className="text-xl font-medium mb-4">Enter your name</h1>
        <input
          type="text"
          value={name}
          onChange={handleInputChange}
          placeholder="Your name"
          disabled={timeLeft !== null}
          className="w-full px-3 py-2 border border-gray-300 rounded mb-4"
        />
        <button
          onClick={startTimer}
          disabled={!name.trim() || timeLeft !== null}
          className="w-full px-3 py-2 bg-black text-white rounded disabled:opacity-50"
        >
          {counter === 0 ? "Start Timer" : "Try Again"}
        </button>

        {hasStarted && (
          <button
            onClick={resetAll}
            className="w-full mt-2 px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Reset
          </button>
        )}

        {timeLeft !== null && (
          <p className="mt-4">
            <b>{name}</b>, there are {timeLeft} seconds left
          </p>
        )}

        {message && <p className="mt-4 font-semibold">{message}</p>}
        {quote && <p className="mt-2 italic text-gray-600">"{quote}"</p>}
      </div>
    </div>
  );
}

export default App;
