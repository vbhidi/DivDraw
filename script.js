let grid_size = 16;
const grid = [];

const grid_container = document.querySelector(".grid-container");

function create_grid()
{
    for (let i = 0; i < grid_size; i++)
    {
        grid[i] = document.createElement("div")
        grid[i].style.display = "flex";
        grid[i].style.flex = "1 1 auto";
        for (let j = 0; j < grid_size; j++)
        {
            grid[i][j] = document.createElement("div");
            grid[i][j].style.flex = "1 1 auto";
            grid[i][j].style.backgroundColor = "rgb(0, 10, 0)";
            grid[i].appendChild(grid[i][j]);
        }
        grid_container.appendChild(grid[i]);
    }
}

create_grid();
