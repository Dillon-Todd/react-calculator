import "./App.css";

const App = () => {
  const btnList = [
    ["AC", "±", "%", "÷"],
    ["7", "8", "9", "X"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+"],
    ["0", ".", "="],
  ];

  return (
    <div className="calculator-grid">
      <div className="screen">
        <div className="previous-operation">123 *</div>
        <div className="current-operation">17</div>
      </div>
      {btnList.flat().map((btn, index) => (
        <button key={index} className={btn === "0" ? "span-2" : ""}>
          {btn}
        </button>
      ))}
    </div>
  );
};

export default App;
