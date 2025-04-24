import React, { useState } from 'react';
import './ScientificCalculator.css';

function ScientificCalculator() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [angleUnit, setAngleUnit] = useState('deg');
  const [isShift, setIsShift] = useState(false);

  // Basic calculator functions
  const handleOperator = (op) => {
    setPreviousValue(parseFloat(display));
    setOperator(op);
    setDisplay('0');
  };

  const handleDecimal = () => {
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperator(null);
  };

  const handleEquals = () => {
    const current = parseFloat(display);
    if (!operator) return;

    let result = 0;
    switch (operator) {
      case '+':
        result = previousValue + current;
        break;
      case '-':
        result = previousValue - current;
        break;
      case '*':
        result = previousValue * current;
        break;
      case '/':
        result = previousValue / current;
        break;
      default:
        return;
    }

    setDisplay(result.toString());
    setPreviousValue(null);
    setOperator(null);
  };
  const handleScientific = (fn) => {
    let value = parseFloat(display);
    try {
      switch(fn) {
        case 'sin':
          value = angleUnit === 'deg' ? Math.sin(value * Math.PI / 180) : Math.sin(value);
          break;
        case 'cos':
          value = angleUnit === 'deg' ? Math.cos(value * Math.PI / 180) : Math.cos(value);
          break;
        case 'tan':
          value = angleUnit === 'deg' ? Math.tan(value * Math.PI / 180) : Math.tan(value);
          break;
        case 'asin':
          value = angleUnit === 'deg' ? Math.asin(value) * 180 / Math.PI : Math.asin(value);
          break;
        case 'acos':
          value = angleUnit === 'deg' ? Math.acos(value) * 180 / Math.PI : Math.acos(value);
          break;
        case 'atan':
          value = angleUnit === 'deg' ? Math.atan(value) * 180 / Math.PI : Math.atan(value);
          break;
        case 'log':
          value = Math.log10(value);
          break;
        case 'ln':
          value = Math.log(value);
          break;
        case 'sqrt':
          value = Math.sqrt(value);
          break;
        case 'exp':
          value = Math.exp(value);
          break;
        case 'x²':
          value = Math.pow(value, 2);
          break;
        case 'x³':
          value = Math.pow(value, 3);
          break;
        case 'π':
          value = Math.PI;
          break;
        case 'e':
          value = Math.E;
          break;
        case 'sinh':
          value = Math.sinh(value);
          break;
        case 'cosh':
          value = Math.cosh(value);
          break;
        case 'tanh':
          value = Math.tanh(value);
          break;
        default:
          return;
      }
      setDisplay(value.toString());
    } catch (error) {
      setDisplay('Error', error.message);
    }
  };
  const toggleAngleUnit = () => {
    setAngleUnit(prev => prev === 'deg' ? 'rad' : 'deg');
  };

  const toggleShift = () => {
    setIsShift(!isShift);
  };

  const handleNumber = (number) => {
    if (display === '0') {
      setDisplay(number);
    } else {
      setDisplay(display + number);
    }
  };
  // Existing scientific functions and state management...

  return (
    <div className="scientific-calculator">
      <div className="display">
        <div className="angle-unit">{angleUnit.toUpperCase()}</div>
        <div className="main-display">{display}</div>
      </div>
      
      <div className="controls">
        <button className="shift" onClick={toggleShift}>
          {isShift ? 'SHIFT' : ''} 2<sup>nd</sup>
        </button>
        <button onClick={toggleAngleUnit}>{angleUnit === 'deg' ? 'DEG' : 'RAD'}</button>
      </div>

      <div className="buttons">
        {/* Scientific functions column */}
        <div className="scientific-functions">
          {/* ... (existing scientific function buttons) ... */}
        </div>

        {/* Main calculator buttons */}
        <div className="basic-operations">
          <button className="clear" onClick={handleClear}>C</button>
          <button className="operator" onClick={() => handleOperator('/')}>/</button>
          <button className="operator" onClick={() => handleOperator('*')}>×</button>
          
          <button onClick={() => handleNumber('7')}>7</button>
          <button onClick={() => handleNumber('8')}>8</button>
          <button onClick={() => handleNumber('9')}>9</button>
          <button className="operator" onClick={() => handleOperator('-')}>-</button>
          
          <button onClick={() => handleNumber('4')}>4</button>
          <button onClick={() => handleNumber('5')}>5</button>
          <button onClick={() => handleNumber('6')}>6</button>
          <button className="operator" onClick={() => handleOperator('+')}>+</button>
          
          <button onClick={() => handleNumber('1')}>1</button>
          <button onClick={() => handleNumber('2')}>2</button>
          <button onClick={() => handleNumber('3')}>3</button>
          <button className="equals" onClick={handleEquals}>=</button>
          
          <button className="zero" onClick={() => handleNumber('0')}>0</button>
          <button onClick={handleDecimal}>.</button>
          <button onClick={() => handleScientific('π')}>π</button>
          <button onClick={() => handleScientific('e')}>e</button>
        </div>

        {/* Additional operations */}
        <div className="advanced-operations">
          <button onClick={() => handleScientific('x²')}>x²</button>
          <button onClick={() => handleScientific('x³')}>x³</button>
          <button onClick={() => handleScientific('sqrt')}>√</button>
          <button onClick={() => handleScientific('exp')}>eˣ</button>
          <button onClick={() => handleNumber('(')}>(</button>
          <button onClick={() => handleNumber(')')}>)</button>
        </div>
      </div>
    </div>
  );
}

export default ScientificCalculator;