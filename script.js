document.addEventListener('DOMContentLoaded', () => {
    const minutesSpan = document.getElementById('minutes');
    const secondsSpan = document.getElementById('seconds');
    let timerInterval;
    let seconds = 0;

    // Gabarito carregado do arquivo gabarito.json
    const gabarito = [1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 5, 4, 3, 2, 1, 5, 4, 3, 2, 1, 5, 4, 3, 2, 1, 5, 4, 3, 2, 1, 5, 4, 3, 2, 1];

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

        if(tableId == 'group2') fieldCount = 25;

        for (let i = 0; i < 5; i++) {
            const row = document.createElement('tr');
            for (let j = 0; j < 5; j++) {
                fieldCount++;
                const cell = document.createElement('td');
                const input = document.createElement('input');
                input.type = 'text';
                input.id = String(fieldCount);
                input.maxLength = 1; // Apenas um dígito
                input.classList.add('small-field');

                // Adiciona evento para mover o foco e iniciar/parar o cronômetro
                input.addEventListener('input', (event) => {
                    handleInput(event, fieldCount, 50);
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

        const fieldNumber = parseInt(input.id, 10);

        // Iniciar o cronômetro ao digitar no primeiro campo
        if (fieldNumber == 1 && input.value.length === 1) {
            startTimer();
        }

        // Parar o cronômetro ao digitar no último campo
        if (fieldNumber == isLastField && input.value.length === 1) {
            stopTimer();
        }

        // Verificar se o valor está correto
        const expectedValue = gabarito[fieldNumber - 1];
        if (parseInt(input.value, 10) === expectedValue) {
            input.style.border = '2px solid green'; // Valor correto
        } else {
            input.style.border = '2px solid red'; // Valor incorreto
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
        if (fieldNumber == 25 && input.value.length === 1) {
            const nextGroup2 = document.getElementById("26");
            nextGroup2.focus();
        }

        
    }

    // Criar os dois grupos de campos
    createInputFields('group1', true);
    createInputFields('group2', false);
});