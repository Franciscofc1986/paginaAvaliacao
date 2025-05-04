document.addEventListener('DOMContentLoaded', () => {
    const minutesSpan = document.getElementById('minutes');
    const secondsSpan = document.getElementById('seconds');
    let timerInterval;
    let seconds = 0;

    // Função para atualizar o cronômetro
    function updateTimer() {
        seconds++;
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;

        minutesSpan.textContent = mins.toString().padStart(2, '0');
        secondsSpan.textContent = secs.toString().padStart(2, '0');
    }

    // Função para iniciar o cronômetro
    function startTimer() {
        if (!timerInterval) {
            timerInterval = setInterval(updateTimer, 1000);
        }
    }

    // Função para parar o cronômetro
    function stopTimer() {
        clearInterval(timerInterval);
        timerInterval = null;
    }

    // Gerar os campos de entrada organizados em tabelas
    function createInputFields(tableId, isFirstGroup) {
        const table = document.getElementById(tableId);
        let fieldCount = 0;

        for (let i = 0; i < 5; i++) {
            const row = document.createElement('tr');
            for (let j = 0; j < 5; j++) {
                fieldCount++;
                const cell = document.createElement('td');
                const input = document.createElement('input');
                input.type = 'text';
                input.id = 'campo' + tableId + "-" + String(fieldCount);
                input.maxLength = 1; // Apenas um dígito
                input.classList.add('small-field');

                // Adiciona evento para mover o foco e iniciar/parar o cronômetro
                input.addEventListener('input', (event) => {
                    handleInput(event, fieldCount, fieldCount === 25);
                });

                cell.appendChild(input);
                row.appendChild(cell);
            }
            table.appendChild(row);
        }
    }

    // Função para manipular a entrada nos campos
    function handleInput(event, fieldCount, isLastField) {
        const input = event.target;

        // Iniciar o cronômetro ao digitar no primeiro campo
        if (input.id == "campogroup1-1" && input.value.length === 1) {
            startTimer();
        }

        // Parar o cronômetro ao digitar no último campo
        if (input.id == "campogroup2-25" && input.value.length === 1) {
            stopTimer();
        }

        // Avançar para o próximo campo automaticamente
        if (input.value.length === 1) {
            const nextInput = input.parentElement.nextSibling?.querySelector('input') ||
                              input.closest('tr').nextSibling?.querySelector('input');
            if (nextInput) {
                nextInput.focus();
            }
        }

        // Parar o cronômetro ao digitar no último campo
        if (input.id == "campogroup1-25" && input.value.length === 1) {
            const nextGroup2 = document.getElementById("campogroup2-1");
            nextGroup2.focus();
        }
    }

    // Criar os dois grupos de campos
    createInputFields('group1', true);
    createInputFields('group2', false);
});