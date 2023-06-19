import Board from "./board";

export default function Game() {
  return (
    <div className="w-full">
      <div className="text-lg">Let's play connect five!</div>
      <Board />
    </div>
  );
}
