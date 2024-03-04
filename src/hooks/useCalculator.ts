/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useRef, useState} from 'react';

enum Operator {
  add = '+',
  subtract = '-',
  multiply = '*',
  divide = '/',
}

export const useCalculator = () => {
  const [formula, setFormula] = useState('');

  const [number, setNumber] = useState('0');
  const [prevNumber, setPrevNumber] = useState('0');

  const lastOperator = useRef<Operator>();

  useEffect(() => {
    if (lastOperator.current) {
      const firstPartFormula = formula.split(' ').at(0);
      setFormula(`${firstPartFormula} ${lastOperator.current} ${number}`);
    } else {
      setFormula(number);
    }
  }, [number]);

  useEffect(() => {
    const subResult = calculateSubResult();
    setPrevNumber(`${subResult}`);
  }, [formula]);

  const clean = () => {
    setNumber('0');
    setPrevNumber('0');
    lastOperator.current = undefined;
    setFormula('0');
  };

  const del = () => {
    let currentSign = '';
    let tempNumber = number;

    if (number.includes('-')) {
      currentSign = '-';
      tempNumber = number.substring(1);
    }

    if (tempNumber.length > 1) {
      return setNumber(currentSign + tempNumber.slice(0, -1));
    }

    setNumber('0');
  };

  const toggleSign = () => {
    if (number.includes('-')) {
      return setNumber(number.replace('-', ''));
    }
    setNumber('-' + number);
  };

  const buildNumber = (numberString: string) => {
    if (number.includes('.') && numberString === '.') {
      return;
    }

    if (number.startsWith('0') || number.startsWith('-0')) {
      // decimal
      if (numberString === '.') {
        return setNumber(number + numberString);
      }
      // evitar si es otro cero y no hay punto
      if (numberString === '0' && number.includes('.')) {
        return setNumber(number + numberString);
      }
      // evaluar si es diferente de cero, no hay punto y es el primer número
      if (numberString !== '0' && !number.includes('.')) {
        return setNumber(numberString);
      }
      // evitar 000000000
      if (numberString === '0' && !number.includes('.')) {
        return;
      }
      setNumber(number + numberString);
    }

    setNumber(number + numberString);
  };

  const setLastNumber = () => {
    calculateResult();

    if (number.endsWith('.')) {
      setPrevNumber(number.slice(0, -1));
    } else {
      setPrevNumber(number);
    }
    setNumber('0');
  };

  const addOperator = () => {
    setLastNumber();
    lastOperator.current = Operator.add;
  };
  const subtractOperator = () => {
    setLastNumber();
    lastOperator.current = Operator.subtract;
  };
  const multilyOperator = () => {
    setLastNumber();
    lastOperator.current = Operator.multiply;
  };
  const divideOperator = () => {
    setLastNumber();
    lastOperator.current = Operator.divide;
  };

  const calculateResult = () => {
    const result = calculateSubResult();
    setFormula(`${result}`);
    lastOperator.current = undefined;
    setPrevNumber('0');
  };

  const calculateSubResult = (): number => {
    const [firstValue, operation, secondValue] = formula.split(' ');

    const numb1 = Number(firstValue);
    const numb2 = Number(secondValue);

    if (isNaN(numb2)) {
      return numb1;
    }

    switch (operation) {
      case Operator.add:
        return numb1 + numb2;
      case Operator.subtract:
        return numb1 - numb2;
      case Operator.multiply:
        return numb1 * numb2;
      case Operator.divide:
        return numb1 / numb2;

      default:
        throw new Error('Operation not implemented');
    }
  };

  return {
    // props
    number,
    prevNumber,
    formula,

    // methods
    buildNumber,
    clean,
    del,
    toggleSign,
    addOperator,
    subtractOperator,
    multilyOperator,
    divideOperator,
    calculateResult,
  };
};
