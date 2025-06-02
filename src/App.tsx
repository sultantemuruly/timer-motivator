import { useState, useEffect } from "react";

function App() {
  const [name, setName] = useState<string>("");
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [message, setMessage] = useState<string>("");
  const [intervalId, setIntervalId] = useState<number | null>(null);
  const [hasStarted, setHasStarted] = useState<boolean>(false);

  useEffect(() => {
    if (timeLeft === 0) {
      clearInterval(intervalId!);
      setIntervalId(null);
      setMessage(`You did it, ${name}!`);
      setTimeLeft(null);
    }
  }, [timeLeft, intervalId, name]);

  useEffect(() => {
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [intervalId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setMessage("");
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    setTimeLeft(null);
    setHasStarted(false);
  };

  const startTimer = () => {
    if (!name.trim()) return;

    setMessage("");
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
          Start Timer
        </button>

        {hasStarted && (
          <button
            onClick={resetAll}
            className="w-full mt-2 px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Reset
          </button>
        )}

        {timeLeft !== null && <p className="mt-4">Time left: {timeLeft}</p>}

        {message && <p className="mt-4 font-semibold">{message}</p>}
      </div>
    </div>
  );
}

export default App;
