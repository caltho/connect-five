import Board from "./board";

export default function Game() {
  return (
    <div className="w-full max-h-screen">
      <div className="text-lg">Let&apos;s play connect five!</div>
      <Board />
    </div>
  );
}
