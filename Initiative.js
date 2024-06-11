document.addEventListener('DOMContentLoaded', function() {
    let roundCounter = 1;
    let currentPlayerIndex = -1;
    let playerCounter = 1;
    let monsterCounter = 1;
    let npcCounter = 1;
    const playersAdded = new Set();
    const initiativeList = document.getElementById("initiativeList");
    
    function updateHighlight() {
        const items = Array.from(initiativeList.querySelectorAll('li'));
        if (items.length === 0) return;

        items.forEach(item => item.classList.remove('highlighted'));

        do {
            currentPlayerIndex = (currentPlayerIndex + items.length) % items.length;
        } while (items[currentPlayerIndex].classList.contains('dead') && items.some(item => !item.classList.contains('dead')));

        items[currentPlayerIndex].classList.add('highlighted');
    }

    function makeItemDraggable(item) {
        item.draggable = true;
        item.ondragstart = (event) => {
            event.dataTransfer.setData("text", event.target.id);
        };
    }

    initiativeList.ondragover = (event) => {
        event.preventDefault();
    };

    initiativeList.ondrop = (event) => {
        event.preventDefault();
        const data = event.dataTransfer.getData("text");
        const droppedItem = document.getElementById(data);
        const dropTarget = event.target.closest('li');
        if (dropTarget && dropTarget !== droppedItem) {
            initiativeList.insertBefore(droppedItem, dropTarget);
            
        }
    };

    function addItem(name, id, isDead = false) {
        const li = document.createElement("li");
        li.id = id;
        li.textContent = name + " ";
        const initLabel = document.createElement("label");
        initLabel.textContent = "Initiative: ";
        initLabel.style.fontFamily = "Arial";
        initLabel.style.fontSize = "12px";
        const initValue = document.createElement("input");
        initValue.type = "number";
        initValue.value = "10";
        initValue.min = 0;
        initValue.max = 99;
        initValue.style.width = "30px";
        const removeButton = document.createElement("button");
        removeButton.textContent = "-";
        removeButton.onclick = () => {
            li.remove();
            playersAdded.delete(name);
            updateHighlight();
            
        };
        const deadButton = document.createElement("button");
        deadButton.textContent = "\u2620";
        deadButton.onclick = () => {
            li.classList.toggle("dead");
            updateHighlight();
            
        };
        const conditionMenu = document.createElement("select");
        conditionMenu.innerHTML = `
        <option value="normal"> </option> 
        <option value="blinded">Blinded</option>
        <option value="charmed">Charmed</option>
        <option value="deafened">Deafened</option>
        <option value="frightened">Frightened</option>
        <option value="grappled">Grappled</option>
        <option value="incapacitated">Incapacitated</option>
        <option value="invisible">Invisible</option>
        <option value="paralyzed">Paralyzed</option>
        <option value="petrified">Petrified</option>
        <option value="poisoned">Poisoned</option>
        <option value="prone">Prone</option>
        <option value="restrained">Restrained</option>
        <option value="stunned">Stunned</option>
        <option value="unconscious">Unconscious</option>
        `;
        li.appendChild(initLabel);
        li.appendChild(initValue);
        li.appendChild(removeButton);
        li.appendChild(deadButton);
        li.appendChild(conditionMenu);
        initiativeList.appendChild(li);
        makeItemDraggable(li);
        updateHighlight();
        
    }

    document.getElementById("addPlayer").onclick = () => {
        const enteredPlayerName = document.getElementById("playerNameInput").value;
        if (enteredPlayerName == ``){
            addItem(`Player ${playerCounter}`,`player-${playerCounter}`);
            playerCounter++;
        }
        else {
            addItem(enteredPlayerName, `monster-${playerCounter}`);
        }
        playerNameInput.value = "";
    };

    document.getElementById("addMonster").onclick = () => {
        const enteredMonsterName = document.getElementById("monsterNameInput").value;
        if (enteredMonsterName == ``){
            addItem(`Monster ${monsterCounter}`,`monster-${monsterCounter}`);
            monsterCounter++;
        }
        else {
            addItem(enteredMonsterName, `monster-${monsterCounter}`);
        }
        monsterNameInput.value = "";
    };

    document.getElementById("addNPC").onclick = () => {
        const enteredMonsterName = document.getElementById("monsterNameInput").value;
        if (enteredMonsterName == ``){
            addItem(`NPC ${npcCounter}`, `npc-${npcCounter}`);
            npcCounter++;
        }
        else {
            addItem(enteredMonsterName, `monster-${monsterCounter}`);
        }
        monsterNameInput.value = "";
    };

    document.getElementById("next").onclick = () => {
        do {
            currentPlayerIndex++;
        } while (initiativeList.children[currentPlayerIndex % initiativeList.children.length].classList.contains('dead'));
        updateHighlight();
        if (currentPlayerIndex % initiativeList.children.length === 0) {
            roundCounter++;
            document.getElementById("roundCounter").textContent = `Round: ${roundCounter}`;
        }
    };

    document.getElementById("previous").onclick = () => {
        do {
            currentPlayerIndex = (currentPlayerIndex - 1 + initiativeList.children.length) % initiativeList.children.length;
        } while (initiativeList.children[currentPlayerIndex].classList.contains('dead'));
        updateHighlight();
    };

    document.getElementById("clearList").onclick = () => {
        initiativeList.innerHTML = '';
        playersAdded.clear();
        monsterCounter = 1;
        npcCounter = 1;
        currentPlayerIndex = -1;
        roundCounter = 1;
        document.getElementById("roundCounter").textContent = `Round: ${roundCounter}`;
        
    };

});