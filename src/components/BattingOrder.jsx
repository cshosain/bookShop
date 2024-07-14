import { useState } from 'react';

function BattingOrder() {
  const [players, setPlayers] = useState([]);

  const handleAddPlayer = (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    const newPlayerName = event.target.elements.price.value; // Access input value
    setPlayers([...players, newPlayerName]); // Add new name to players array
    event.target.elements.price.value = ''; // Clear input field after adding
  };

  const handleShufflePlayers = () => {
    setPlayers([...players.sort(() => Math.random() - 0.5)]); // Shuffle players
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
      <h1 className="text-3xl font-bold mb-4">Batting Order</h1>
      <table className="shadow-md rounded-lg w-full overflow-hidden">
        <thead>
          <tr className="bg-gray-700 text-white font-bold">
            <th className="p-2">Order</th>
            <th className="p-2">Player Name</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player, index) => (
            <tr key={index} className="text-gray-700">
              <td className="p-2 border-b border-gray-200">{index + 1}</td>
              <td className="p-2 border-b border-gray-200">{player}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <form onSubmit={handleAddPlayer} className="mt-4 flex items-center">
        <input
          type="text"
          name="price"
          id="price"
          className="block rounded-md border border-gray-300 py-2 pl-3 pr-10 text-gray-700 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Player Name"
        />
        <button
          type="submit"
          value="Add Player"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center ml-4"
        >
          Add Player
        </button>
      </form>
      <button
        onClick={handleShufflePlayers}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded inline-flex items-center mt-4"
      >
        Shuffle Batting Order
      </button>
    </div>
  );
}

export default BattingOrder;
