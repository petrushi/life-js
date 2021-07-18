window.onload = () => {
    const FIELD = document.getElementById('field')
    const CHANGED_CELLS = new Set()
    const CELLSQ = 20
    let timer
    let playing = false
    const STARTBTN = document.getElementById('startBtn')
    const rowNumbers = document.getElementById('row-num')
    const columnNumbers = document.getElementById('col-num')
    const FUN = document.getElementById("fun")

    fillField(FIELD);
    STARTBTN.addEventListener('click', startBtnHandler)
    FUN.addEventListener('click', funHandler)

    function funHandler() {
        let ids =[ 
            "12-17", "13-3", "13-5", "13-7", "13-17", "14-1", "14-4", "14-11", "14-15", "15-2", "15-5", "15-6", "15-11", "15-13", "15-14",
            "15-15", "15-17", "16-1","16-15", "17-2", "17-4", "17-8", "17-9", "17-14", "18-1", "18-11", "18-12", "18-15", "18-19", "19-4",
        ]
        for (id of ids){
            changeCell(id)
        }
        start()
    }

    function startBtnHandler() {
        if (playing) {
            playing = false
            STARTBTN.innerHTML = 'start'
            clearTimeout(timer)
        } else {
            start()
        }
    }

    function start() {
        playing = true
        STARTBTN.innerHTML = 'stop'
        play();
    }
    function play() {
        life();
        if (playing) {
            timer = setTimeout(play, 400)
        }
    }

    function fillField(field) {
        for (let i = 0; i < CELLSQ; i++) {
            let row = document.createElement('div')
            row.className = 'row'
            row.id = 'row-' + i
            let colNumber = document.createElement('span')
            let rowNumber = document.createElement('span')
            colNumber.innerHTML = i
            rowNumber.innerHTML = i
            rowNumbers.appendChild(rowNumber)
            columnNumbers.appendChild(colNumber)
            for (let j = 0; j < CELLSQ; j++) {
                let cell = document.createElement('div')
                cell.className = 'dead'
                cell.id = String(i) + '-' + j
                cell.addEventListener('mousedown', () => changeCell(cell.id))
                row.appendChild(cell)
            }
            field.appendChild(row)
        }
    }

    function changeCell(id) {
        CHANGED_CELLS.add(id)
        let cell = document.getElementById(id)
        if (cell.className == 'alive'){
            cell.className = 'dead'
        } else  {
            cell.className = 'alive'
        }
    }

    function getNeighbors(id) {
        let neighbors = new Set()
        let [column, row] = id.split('-');

        for (let i = column - 1; (i < +column + 2) && (i < CELLSQ) && (i >= 0); i++) {
            for (let j = row - 1; (j < +row + 2) && (j < CELLSQ) && (j >= 0); j++){
                neighbors.add(i + '-' + j)
            }
        }
        neighbors.delete(id)
        return neighbors
    }

    function getAliveNeighbors(neighbors){
        let aliveNeighbors = 0

        for (let id of neighbors){
            if (document.getElementById(id).className == 'alive') {
                aliveNeighbors++;
            }
        }
        return aliveNeighbors
    }

    function life() {

        for (let id of CHANGED_CELLS) {
            let cell = document.getElementById(id)
            let className = cell.className
            let neighbors = getNeighbors(id)
            let aliveNeighbors = getAliveNeighbors(neighbors)
            
            if (className == 'alive' && aliveNeighbors != 2){
                changeCell(id, className)
            } else if (className == 'dead' && aliveNeighbors == 2) {
                changeCell(id, className)
                let neighbors = getNeighbors(id)
                for (neighbor of neighbors){
                    CHANGED_CELLS.add(neighbor)
                }
            } else if (className == 'dead' && aliveNeighbors == 0) {
                CHANGED_CELLS.delete(id)
            }
        }
    }
}

