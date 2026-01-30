export default function LoadingScreen({ message }: { message: string }) {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 backdrop-blur-sm">
      <div className="flex flex-col justify-center items-center h-full">
        <p className="text-2xl font-bold">{message}</p>
        <span className="loader"></span>
      </div>
    </div>
  );
}
