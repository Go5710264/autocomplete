class Autocomplete {
  constructor( container ) {
    this.container = container; // доступ к контейнеру с input
    this.input = container.querySelector( '.autocomplete__input' ); // список с предложенными словами
    this.searchInput = container.querySelector( '.autocomplete__search' ); // поле с введенным значением
    this.list = container.querySelector( '.autocomplete__list' ); // какой-то список после input 
    this.valueContainer = container.querySelector( '.autocomplete__value' ); // обертка для input и со значением в input
    this.valueElement = container.querySelector( '.autocomplete__text-content' ); // значение текста в input

    this.registerEvents();
  }

  registerEvents() {
    this.valueContainer.addEventListener( 'click', e => { // обработчик клика для обертки 
      this.searchInput.classList.add( 'autocomplete__search_active' ); // смена display для поля ввода на inline-block
      this.list.classList.add( 'autocomplete__list_active' ); //  смена display для спика после поля ввода на inline-block
      this.searchInput.value = this.valueElement.textContent.trim(); // удаление пробелов
      this.searchInput.focus();

      this.onSearch();
    });


    this.searchInput.addEventListener( 'input', e => this.onSearch());

    this.list.addEventListener( 'click', e => {
      const { target } = e;
      if ( !target.matches( '.autocomplete__item' )) {
        return;
      }

      const { textContent: text } = target,
        { id: value, index } = target.dataset;

      this.onSelect({
        index,
        text,
        value
      });
    });
  }

  onSelect( item ) {
    this.input.selectedIndex = item.index;
    this.valueElement.textContent = item.text;

    this.searchInput.classList.remove( 'autocomplete__search_active' );
    this.list.classList.remove( 'autocomplete__list_active' );
  }

  onSearch() {
    const matches = this.getMatches( this.searchInput.value );

    this.renderMatches( matches );
  }

  renderMatches( matches ) {
    const html = matches.map( item => `
    	<li>
        <span class="autocomplete__item"
        	data-index="${item.index}"
          data-id="${item.value}"
        >${item.text}</span>
      </li>
    `);

    this.list.innerHTML = html.join('');
  }

  getMatches( text ) { // получить совпадения
    let coincidences = []; // массив совпадний
    let matchValue = []; // массив значений

    let answerOptions = Array.from(this.input.children); // преобразование дочерних элементов select к массиву
    
    answerOptions.forEach((option) => { // итерация по вариантам ответа
      let responseText = option.text; // получение текста варианта ответа
      
      if (responseText.includes(text)) { // если вариант ответа содержит текст
        coincidences.push(responseText); // запушить слово в совпадения
        matchValue.push(option.value); // запушить значение слова в массив значений
      }
    });

    let result = [];

    coincidences.forEach((element, index) => { // каждый элемент массива
      result.push({ // пушить в result
        text: element,
        value: matchValue[index] // поиск элемента массива matchValue по индексу
      })
    })

    return result;
  }
}

new Autocomplete( document.querySelector( '.autocomplete' ));
