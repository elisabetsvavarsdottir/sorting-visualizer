import React from 'react';
import './Sortingvisualizer.css'
import {getMergeSortAnimations} from '../Sortingalgorithms/mergesort.js';
// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 1;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 310;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'turquoise';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

export default class Sortingvisualizer extends React.Component{
    constructor(props){
        super(props);

        this.state ={
            array:[],
        };
    }

    componentDidMount(){
        this.resetArray(); // when page reloads it calls reset array
    }

    resetArray(){
        const array = [];
        for(let i =0; i< 250; i++){ // loop 250 fills laptop screen
            array.push(randomIntFromInterval(5,730));//generates random numbers between 5-1000
        }
        this.setState({array}); // resets the state to have the new array
    }
    //Sorting algorithms

    //merge sort:
    //devides the array into two halves and then merges the two halves
    mergeSort(){
        const animations = getMergeSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
    }


    render(){
        const {array} = this.state;
        return (
            
            <div className ="array-container">
            {array.map((value, idx)=>( // iterating through the array and mapping all the values
                <div 
                className = "array-bar" key={idx} style={{ height:`${value}px`,}} > 
                </div>
            ))}
            <br></br>
            <button onClick={() => this.resetArray()}>Click for new array</button>
            <button onClick={() => this.mergeSort()}>Merge Sort</button>
            <button onClick={() => this.quickSort()}>Quick Sort</button>
            <button onClick={() => this.heapSort()}>Heap Sort</button>
            <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
            </div>// for the height the value is in pixles
        )
    }
}

//randomise a number
function randomIntFromInterval(min,max){
    return Math.floor(Math.random() *(max-min +1)+min);
}

// function arrayAreEqual(arrayOne, arrayTwo){
//     if(arrayOne.length !== arrayTwo.length) return false;
//     for(let o=0; i < arrayOne.length; i++){
//         offscreenBuffering(arrayOne[i] !== arrayTwo[i]){

//         }
//     }
// }