"use client";

import { FaSortAmountUp, FaSortAmountDown } from "react-icons/fa";
import { RiFlipVerticalLine, RiResetLeftFill } from "react-icons/ri";
import { Source } from "./source";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import { useState } from "react";
import {
  FlipDominoes,
  RemoveDuplicate,
  RemoveTotal,
  SortDominoes,
} from "./utils";

export default function Home() {
  const [dominoes, setDominoes] = useState<number[][]>(Source);
  const [removeTotal, setRemoveTotal] = useState<string>("");
  const doubleNumbers = Source.filter(([a, b]) => a === b);
  const doubleSum = doubleNumbers.reduce((sum, [a]) => sum + a, 0);

  const positionsMap: Record<number, number[]> = {
    1: [5],
    2: [3, 7],
    3: [3, 5, 7],
    4: [1, 3, 7, 9],
    5: [1, 3, 5, 7, 9],
    6: [1, 3, 4, 6, 7, 9],
  };

  const generateGrid = (number: number, isDouble: boolean) => {
    const positions = positionsMap[number] || [];
    return Array.from({ length: 9 }, (_, index) => (
      <div
        key={index}
        className={`flex justify-center items-center h-2 w-2 ${
          positions.includes(index + 1)
            ? isDouble
              ? "bg-red-500 rounded-full"
              : "bg-black rounded-full"
            : "text-transparent"
        }`}
      ></div>
    ));
  };

  const handleSort = (order: "asc" | "desc") => {
    const sortedDominoes = SortDominoes(dominoes, order); // Call the imported function
    setDominoes(sortedDominoes);
  };

  const handleFlip = () => {
    const flippedDominoes = FlipDominoes(dominoes);
    setDominoes(flippedDominoes);
  };

  const handleRemoveDup = () => {
    const notDupDominoes = RemoveDuplicate(dominoes);
    setDominoes(notDupDominoes);
  };

  const handleRemoveTotal = () => {
    const total = Number(removeTotal);
    if (isNaN(total)) return;
    const filteredDominoes = RemoveTotal(dominoes, total);
    setDominoes(filteredDominoes);
    setRemoveTotal("");
  };

  const handleReset = () => {
    setDominoes([...Source]);
  };

  return (
    <div className="flex flex-col items-center mx-auto max-w-[1200px] p-4 mt-4">
      <h1 className="font-bold text-3xl text-red-800">Domino App</h1>
      <div className="flex flex-col md:flex-row w-full justify-center gap-8 ">
        <div className="flex justify-end w-[50%] mx-auto md:mx-0">
          <div className="mt-4 grid grid-cols-3 gap-4">
            {dominoes.map((pair, index) => {
              const isDouble = pair[0] === pair[1];
              return (
                <div
                  key={index}
                  className="flex flex-col w-[70px] h-[115px] items-center border border-gray-300 rounded-md p-4"
                >
                  <div className="grid grid-cols-3 gap-1">
                    {generateGrid(pair[0], isDouble)}
                  </div>
                  <div className="w-full h-0.5 bg-gray-400 my-2"></div>
                  <div className="grid grid-cols-3 gap-1">
                    {generateGrid(pair[1], isDouble)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col gap-6 w-full md:w-[30%] mt-4 pl-10">
          <button
            className="flex gap-1 text-sm font-bold p-1 rounded-lg"
            onClick={() => handleSort("asc")}
          >
            <FaSortAmountUp className="m-1 text-orange-600" />
            SORT ASC
          </button>
          <button
            className="flex gap-1 text-sm font-bold p-1 rounded-lg"
            onClick={() => handleSort("desc")}
          >
            <FaSortAmountDown className="m-1 text-yellow-600" />
            SORT DESC
          </button>
          <button
            className="flex gap-1 text-sm font-bold p-1 rounded-lg"
            onClick={handleFlip}
          >
            <RiFlipVerticalLine className="m-1 text-indigo-600" />
            FLIP
          </button>
          <button
            className="flex gap-1 text-sm font-bold p-1 rounded-lg"
            onClick={handleRemoveDup}
          >
            <IoMdRemoveCircleOutline className="m-1 text-red-600" />
            REMOVE DUPLICATE
          </button>
          <div className="flex flex-col">
            <input
              type="text"
              className="px-1 border-2 my-1 w-[90%] ml-2"
              placeholder="Input total number"
              value={removeTotal}
              onChange={(e) => setRemoveTotal(e.target.value)}
            />
            <p className="text-gray-600 text-sm ml-2">
              Remove cards with certain total number
            </p>
            <button
              className="flex gap-1 text-sm font-bold p-1 rounded-lg"
              onClick={handleRemoveTotal}
            >
              <MdDeleteOutline className="m-1 text-rose-600" />
              REMOVE
            </button>
          </div>
          <button
            className="flex gap-1 text-sm font-bold p-1 rounded-lg"
            onClick={handleReset}
          >
            <RiResetLeftFill className="m-1" />
            RESET
          </button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between w-full mt-6">
        <div className="flex flex-col w-full items-center mt-4">
          <h3 className="font-semibold">Source</h3>
          <div className="flex gap-2 mt-2">
            {Source.map((pair, index) => (
              <div
                key={index}
                className="flex justify-center items-center border border-gray-300 rounded md:p-2"
              >
                [{pair[0]}], [{pair[1]}]
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center w-full mt-4">
          <h3 className="font-semibold">Double Numbers</h3>
          {doubleNumbers.length > 0 ? (
            <p className="mt-2 text-gray-800">
              Total: <span className="font-bold">{doubleSum}</span>
            </p>
          ) : (
            <p className="mt-2 text-gray-500">No double numbers found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
