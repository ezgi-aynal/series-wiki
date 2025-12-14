function ErrorMessage({ message, onRetry }) {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen px-4">
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-md">
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> {message}</span>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          Try Again
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;