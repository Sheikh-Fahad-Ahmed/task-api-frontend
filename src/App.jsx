function App() {
  return (
    <div>
      <Main />
    </div>
  );
}

function Main() {
  return (
    <form action="">
      <input type="text" name="title" id="" placeholder="title" />
      <input type="text" name="description" id="" placeholder="description" />
      <select name="status" id="">
        <option value="pending">pending</option>
        <br />
        <option value="in-progress">in-progress</option>
        <option value="done">done</option>
      </select>
    </form>
  );
}
export default App;
