(function () {
    // Функция копирования текста с визуальной обратной связью
    function copyPromptToClipboard(promptId, buttonElement) {
        const promptDiv = document.getElementById(promptId);
        if (!promptDiv) return;

        let textToCopy = promptDiv.innerText || promptDiv.textContent;
        // дополнительная очистка — удаляем лишние пробелы, но сохраняем формат
        if (!textToCopy) return;

        navigator.clipboard.writeText(textToCopy).then(() => {
            // визуальный эффект
            const originalText = buttonElement.innerHTML;
            buttonElement.innerHTML = '✅ Скопировано!';
            buttonElement.classList.add('copied');
            setTimeout(() => {
                buttonElement.innerHTML = originalText;
                buttonElement.classList.remove('copied');
            }, 2000);
        }).catch(err => {
            console.error('Ошибка копирования: ', err);
            buttonElement.innerHTML = '❌ Ошибка';
            setTimeout(() => {
                buttonElement.innerHTML = '📋 Копировать промпт';
            }, 1500);
        });
    }

    // Находим все кнопки с data-prompt-id
    const copyButtons = document.querySelectorAll('.copy-btn');
    copyButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const promptId = btn.getAttribute('data-prompt-id');
            if (promptId) {
                copyPromptToClipboard(promptId, btn);
            }
        });
    });
})();
