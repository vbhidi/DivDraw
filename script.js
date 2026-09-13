let currentPen = document.querySelector("#regular");
currentPen.style.backgroundColor = "darkgreen";
currentPen.style.color = "white";

let currentGridSize = 16;
let drawing = false;
let color = "white";
let background_color = "black";
let gridOn = false;
const grid = [];

// dom elements
const body = document.querySelector("body");
const grid_container = document.querySelector(".grid-container");
const size_button = document.querySelector("#size");
const toggle_grid_button = document.querySelector("#toggle-grid");
const clear_button = document.querySelector("#clear");
const penList = document.querySelectorAll(".pen");


// functions
// creates grid of input grid size, references currentGridSize variable
function create_grid()
{
    for (let i = 0; i < currentGridSize; i++)
    {
        // making rows for cells
        grid[i] = document.createElement("div")
        grid[i].style.display = "flex";
        grid[i].style.flex = "1 1 auto";
        for (let j = 0; j < currentGridSize; j++)
        {
            // create each cell of grid
            grid[i][j] = document.createElement("div");
            grid[i][j].style.flex = "1 1 auto";
            grid[i][j].style.backgroundColor = background_color;
            
            // event listeners
            grid[i][j].addEventListener("mouseover", () => {
                if (drawing)
                {
                    draw(grid[i][j]);
                }
            })
            grid[i][j].addEventListener("click", () => {
                draw(grid[i][j]);
            })

            // append to row
            grid[i].appendChild(grid[i][j]);
        }
        grid_container.appendChild(grid[i]);
    }
}

// implements drawing modes
function draw(cell)
{
    let mode = currentPen.textContent;
    switch (mode)
    {
        case 'P':
            cell.style.backgroundColor = color;
            cell.style.opacity = "";
            break;
        case 'R':
            let randColor = [];
            randColor[0] = Math.floor(Math.random() * 256);
            randColor[1] = Math.floor(Math.random() * 256);
            randColor[2] = Math.floor(Math.random() * 256);
            cell.style.backgroundColor = `rgb(${randColor[0]}, ${randColor[1]}, ${randColor[2]})`;
            cell.style.opacity = "";
            break;
        case 'D':
            if (cell.style.opacity === "")
            {
                cell.style.opacity = 0.9;
                break;
            }
            if (cell.style.opacity > 0)
                cell.style.opacity = cell.style.opacity - 0.1;
            break;
        case 'E':
            break;
    }
}

// selects each cell from grid starting from 0th row and column
// references CurrentGridSize variable
function modifyGridCells(callback)
{
    for (let i = 0; i < currentGridSize; i++)
    {
        for (let j = 0; j < currentGridSize; j++)
        {
            callback(grid[i][j]);
        }
    }
}

// references currentGridSize variable
function deleteGrid()
{
    for (let i = 0; i < currentGridSize; i++)
    {
        grid[i].remove();
        for (let j = 0; j < currentGridSize; j++)
        {
            grid[i][j].remove();
        }
    }
}

function changeGridSize()
{
    let newGridSize = prompt("Enter grid size", 16);
    // prompt returns string
    newGridSize = +newGridSize;
    if (!Number.isInteger(newGridSize) || newGridSize < 1 || newGridSize > 64)
    {
        alert("Grid size should be a positive integer between 1 and 64.");
        return;
    }
    deleteGrid()
    currentGridSize = newGridSize;
    create_grid();
    
    // since this function also removes gridlines
    if (gridOn)
    {
        gridOn = false;
    }
}

create_grid();


// event selectors
// to draw
grid_container.addEventListener("mousedown", () => {
    drawing = true;
});
body.addEventListener("mouseup", () => {
    drawing = false;
})

// for buttons
size_button.addEventListener("click", changeGridSize);
toggle_grid_button.addEventListener("click", () => {
    // toggle grid
    modifyGridCells((cell) => {
        if (!gridOn)
        {
            cell.style.border = "0.5px solid darkslategray";
            return;
        }
        cell.style.border = "";
    })
    // toggle gridOn variable
    if (!gridOn)
    {
        gridOn = true;
        return;
    }
    gridOn = false;
});
clear_button.addEventListener("click", () => {
    modifyGridCells((cell) => {
        cell.style.backgroundColor = background_color;
        cell.style.opacity = "";
    })
});

// for pens
penList.forEach((pen) => {
    pen.addEventListener("click", () => {
        currentPen.style.backgroundColor = "black";
        currentPen.style.color = "green";
        currentPen = pen;
        currentPen.style.backgroundColor = "darkgreen";
        currentPen.style.color = "white";
    })
})
