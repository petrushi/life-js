window.onload = () => {
    const FIELD = document.getElementById('field')
    const CHANGED_CELLS = new Set()
    const CELLS = 50
    let timer
    let playing = false
    const STARTBTN = document.getElementById('startBtn')
    const rowNumbers = document.getElementById('row-num')
    const columnNumbers = document.getElementById('col-num')
    const SOUP = document.getElementById("soupBtn")
    const OSCILLATOR = document.getElementById("oscillatorBtn")
    fillField(FIELD);
    STARTBTN.addEventListener('click', startBtnHandler)
    SOUP.addEventListener('click', soupHandler)
    OSCILLATOR.addEventListener('click', oscillatorHandler)

    function oscillatorHandler() {
        let ids =[
            "14-12", "15-13", "12-14", "13-15", "29-15", "30-16"
        ]
        for (id of ids){
            changeCell(id)
        }
        if (!playing){
            start()
        }
    }

    function soupHandler() {
        let ids =[ 
            "8-6", "9-5", "9-12", "10-5", "10-7", "10-11",
            "11-4", "11-6", "11-9", "11-12", "12-3", "12-4",
            "12-6", "12-7", "12-12", "13-2", "13-11", "13-12",
            "13-13", "14-6", "15-6", "15-9", "16-6", "17-7", "17-8"
        ]
        for (id of ids){
            changeCell(id)
        }
        if (!playing){
            start()
        }
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
        loop();
    }

    function loop() {
        life();
        if (playing) {
            timer = setTimeout(loop, 100)
        }
    }

    function fillField(field) {
        for (let i = 0; i < CELLS; i++) {
            let row = document.createElement('div')
            row.className = 'row'
            row.id = 'row-' + i
            let colNumber = document.createElement('div')
            let rowNumber = document.createElement('div')
            colNumber.className = 'num'
            rowNumber.className = 'num'
            colNumber.innerHTML = i
            rowNumber.innerHTML = i
            rowNumbers.appendChild(rowNumber)
            columnNumbers.appendChild(colNumber)

            for (let j = 0; j < CELLS; j++) {
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

        for (let i = column - 1; (i < +column + 2) && (i < CELLS) && (i >= 0); i++) {
            for (let j = row - 1; (j < +row + 2) && (j < CELLS) && (j >= 0); j++){
                neighbors.add(i + '-' + j)
            }
        }
        neighbors.delete(id)
        return neighbors
    }

    function countAliveNeighbors(neighbors){
        let aliveNeighbors = 0

        for (let id of neighbors){
            if (document.getElementById(id).className == 'alive') {
                aliveNeighbors++;
            }
        }
        return aliveNeighbors
    }

    function life() {
        let cellsToChange = new Set()

        for (let id of CHANGED_CELLS) {
            let cell = document.getElementById(id)
            let className = cell.className
            let neighbors = getNeighbors(id)
            let aliveNeighbors = countAliveNeighbors(neighbors)

            if (className == 'dead' && aliveNeighbors == 0) {
                CHANGED_CELLS.delete(id)
                continue
            }
            else {
                let neighbors = getNeighbors(id)
                for (neighbor of neighbors){
                    CHANGED_CELLS.add(neighbor)
                }
                if (className == 'alive' && aliveNeighbors != 2){
                    cellsToChange.add(id)
                } else if (className == 'dead' && aliveNeighbors == 2) {
                    cellsToChange.add(id)
                }
            }
        }
        for (let id of cellsToChange) {
            changeCell(id)
            CHANGED_CELLS.add(id)
        }
    }
}
