window.onload = () => {
    const FIELD = document.getElementById('field')
    const CHANGED_CELLS = new Set()
    let CELLS = 50
    let SPEED = 4120
    let timer
    let playing = false
    const STARTBTN = document.getElementById('startBtn')
    const SOUP = document.getElementById("soupBtn")
    const OSCILLATOR = document.getElementById("oscillatorBtn")
    const CLEARHALF = document.getElementById("clearHalfbtn")

    STARTBTN.addEventListener('click', startBtnHandler)
    SOUP.addEventListener('click', soupHandler)
    OSCILLATOR.addEventListener('click', oscillatorHandler)
    CLEARHALF.addEventListener('click', removeHalf)

    fillField(FIELD);

    function startBtnHandler() {
        if (playing) {
            playing = false
            STARTBTN.innerHTML = '<span>start</span>'
            STARTBTN.style.backgroundColor = '#451e3e'
            clearTimeout(timer)
        } else {
            start()
        }
    }

    function removeHalf() {
        let aliveCells = document.getElementsByClassName('alive')
        for (cell of aliveCells) {
            cell.className = 'dead'
        }
    }

    function oscillatorHandler() {
        let ids = [
            "14-12", "15-13", "12-14", "13-15", "29-15", "30-16",
            "46-12", "45-13", "47-13"
        ]
        for (id of ids) {
            changeCell(id)
        }
        if (!playing) {
            start()
        }
    }

    function soupHandler() {
        let ids = [
            "21-0", "24-0", "22-2", "23-2", "21-49", "24-49", "22-47", "23-47"
        ]
        for (id of ids) {
            changeCell(id)
        }
        if (!playing) {
            start()
        }
    }

    function start() {
        playing = true
        STARTBTN.innerHTML = '<span>stop</span>'
        STARTBTN.style.backgroundColor = '#651e3e'
        loop();
    }

    function loop() {
        life();
        if (playing) {
            timer = setTimeout(loop, SPEED)
        }
    }

    function fillField(field) {
        for (let i = 0; i < CELLS; i++) {
            let row = document.createElement('div')
            row.className = 'row'
            row.id = 'row-' + i

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

        if (cell.className == 'alive') {
            cell.className = 'dead'
        } else {
            cell.className = 'alive'
        }
    }

    function getNeighbors(id) {
        let neighbors = new Set()
        let [column, row] = id.split('-');

        for (let i = column - 1; (i < +column + 2) && (i < CELLS) && (i >= 0); i++) {
            for (let j = row - 1; (j < +row + 2) && (j < CELLS) && (j >= 0); j++) {
                neighbors.add(i + '-' + j)
            }
        }
        neighbors.delete(id)
        return neighbors
    }

    function countAliveNeighbors(neighbors) {
        let aliveNeighbors = 0

        for (let id of neighbors) {
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
                if ((className == 'alive' && aliveNeighbors != 2) || (className == 'dead' && aliveNeighbors == 2)) {
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
