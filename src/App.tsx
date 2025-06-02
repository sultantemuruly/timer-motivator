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
  const [duration, setDuration] = useState<number>(10);
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
  }, [timeLeft, intervalId]);

  useEffect(() => {
    const savedName = localStorage.getItem("username");
    if (savedName) {
      setName(savedName);
    }
  }, []);

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
    localStorage.setItem("username", e.target.value);
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
    setTimeLeft(duration);
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-black px-4">
      {/* Progress Bar */}
      {timeLeft !== null && (
        <div className="absolute top-20 w-1/2 h-4 bg-gray-200 border border-black rounded overflow-hidden mb-4">
          <div
            className="h-full bg-blue-600 transition-all duration-100 ease-linear"
            style={{ width: `${((duration - timeLeft) / duration) * 100}%` }}
          />
        </div>
      )}

      {/* Detials Input */}
      <div className="text-center w-full max-w-sm">
        <h1 className="text-xl font-medium mb-4">Enter Details</h1>
        <input
          type="text"
          value={name}
          onChange={handleInputChange}
          placeholder="Your name"
          disabled={timeLeft !== null}
          className="w-full px-3 py-2 border border-gray-300 rounded mb-4"
        />

        <select
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
          disabled={timeLeft !== null}
          className="w-full px-3 py-2 border border-gray-300 rounded mb-4"
        >
          <option value={10}>10 seconds</option>
          <option value={20}>20 seconds</option>
          <option value={30}>30 seconds</option>
        </select>

        <button
          onClick={startTimer}
          disabled={!name.trim() || timeLeft !== null}
          className="w-full px-3 py-2 bg-blue-700 text-white rounded disabled:opacity-50"
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

        {/* Output */}
        {message && (
          <p className="mt-6 font-semibold text-blue-700 transition-all duration-700 ease-out scale-100 opacity-100 animate-bounce">
            {message}
          </p>
        )}
        {quote && <p className="mt-2 italic text-gray-600">"{quote}"</p>}
      </div>
    </div>
  );
}

export default App;
