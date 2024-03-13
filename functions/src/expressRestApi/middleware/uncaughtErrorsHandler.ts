function handleException(): void {
  process
    .on("unhandledRejection", (error, promise) => {
      console.error(error, "Unhandled Rejection at Promise", promise);
    })
    .on("uncaughtException", (err) => {
      console.error(err, "Uncaught Exception thrown");
    });
}

export default handleException;
