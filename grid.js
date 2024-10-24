class GridModule {
    constructor(gridContainer, hoverInfo, gridSize = 50) {
        this.gridContainer = gridContainer;
        this.hoverInfo = hoverInfo;
        this.gridSize = gridSize;
        this.rows = 10;  // Default grid rows
        this.cols = 10;  // Default grid columns
    }

    // Method to create the grid dynamically
    createGrid(rows, cols) {
        this.gridContainer.innerHTML = '';  // Clear existing grid

        // Adjust the grid template for columns and rows
        this.gridContainer.style.gridTemplateColumns = `repeat(${cols}, ${this.gridSize}px)`;
        this.gridContainer.style.gridAutoRows = `${this.gridSize}px`;

        // Loop to create individual grid cells
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const gridCell = document.createElement('div');
                gridCell.classList.add('gridCell');
                gridCell.innerText = `(${col}, ${row})`;  // Display the coordinates

                // Add hover event to show coordinates in hoverInfo div
                gridCell.addEventListener('mouseenter', () => {
                    this.hoverInfo.innerText = `Hovering over: (${col}, ${row})`;
                });

                gridCell.addEventListener('mouseleave', () => {
                    this.hoverInfo.innerText = 'Hover over a cell to see coordinates here.';
                });

                this.gridContainer.appendChild(gridCell);
            }
        }
    }

    // Method to update the grid size
    updateGrid(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.createGrid(this.rows, this.cols);
    }

    // Method to set the grid size dynamically (optional)
    setGridSize(size) {
        this.gridSize = size;
        this.updateGrid(this.rows, this.cols);  // Redraw the grid with the new size
    }

    // Method to handle window resize if necessary
    handleResize() {
        window.addEventListener('resize', () => {
            this.updateGrid(this.rows, this.cols);
        });
    }

    // Method to initialize the grid (you can add more init steps if needed)
    init(rows = 10, cols = 10) {
        this.createGrid(rows, cols);  // Default grid creation
    }
}

// Main script
const gridContainer = document.getElementById('gridContainer');
const hoverInfo = document.getElementById('hoverInfo');
const rowsInput = document.getElementById('rowsInput');
const colsInput = document.getElementById('colsInput');
const updateGridBtn = document.getElementById('updateGridBtn');

// Initialize the grid module
const gridModule = new GridModule(gridContainer, hoverInfo);

// Initial grid creation
window.onload = () => {
    gridModule.init(10, 10);  // Create default 10x10 grid
};

// Handle grid update when the button is clicked
updateGridBtn.addEventListener('click', () => {
    const rows = parseInt(rowsInput.value);
    const cols = parseInt(colsInput.value);
    gridModule.updateGrid(rows, cols);
});

// Optional: Handle window resize if you want the grid to be responsive
gridModule.handleResize();
