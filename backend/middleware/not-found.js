const notFound = (req, res) => {
  res.status(400).send("Route does not exists");
};

export default notFound;
