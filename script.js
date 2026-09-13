// todo: add toggle grid button or maybe not
let drawing = false;
let color = "white";
const grid = [];

const body = document.querySelector("body");
const grid_container = document.querySelector(".grid-container");

// creates grid of input grid size 
function create_grid(grid_size)
{
    for (let i = 0; i < grid_size; i++)
    {
        // making rows for cells
        grid[i] = document.createElement("div")
        grid[i].style.display = "flex";
        grid[i].style.flex = "1 1 auto";
        for (let j = 0; j < grid_size; j++)
        {
            // create each cell of grid
            grid[i][j] = document.createElement("div");
            grid[i][j].style.flex = "1 1 auto";
            grid[i][j].style.backgroundColor = "rgb(0, 10, 0)";
            
            // event listeners
            grid[i][j].addEventListener("mouseover", () => {
                if (drawing)
                {
                    grid[i][j].style.backgroundColor = color;
                }
            })
            grid[i][j].addEventListener("click", () => {
                grid[i][j].style.backgroundColor = color;
            })

            grid[i].appendChild(grid[i][j]);
        }
        grid_container.appendChild(grid[i]);
    }
}

grid_container.addEventListener("mousedown", () => {
    drawing = true;
});
body.addEventListener("mouseup", () => {
    drawing = false;
})

create_grid(64);
