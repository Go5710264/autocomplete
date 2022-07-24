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
    /*
      TODO: этот метод нужно дописать
      text - фраза, которую вводят в поле поиска
      Метод должен вернуть массив.

      Он формируется на основе списка опций select-элемента (this.input)
      Подходящие опции - те, чей текст содержит то, что есть в аргументе text
      Необходимо вернуть массив объектов со свойствами:
      {
        text: 'Содержимое <option>',
        value: 'Содержимое атрибута value'
      }
    */

    // // разбитие введенной фразы на массив из букв
    let arrText = [...text]; // разбил на массив букв
    // // let textLength = arrText.length; // длинна массивва arrText
      
    let arrOption = Array.from(this.input.children); // преобразование дочерних элементов select к массиву
    arrOption.forEach((option, index) => { // каждый элемент options
      // let arrLetters = [...option.text]; // разбить на массив состоящий из букв 
      let arrLetters = option.text; // получение слова из списка

      function comparison (symbol, indx) {
        if (arrLetters.includes(symbol)) { // если в слове из списка содержится данная буква
          if (indx === arrText.length - 1) { // если данная буква последняя
            // тут должно быть помещение слова из списка и его value в объект каторый будет выбрасываться из getMatches
            // но как данный обьект переместить в return? если массив не объявлен в переменную??
          }
          return false; // выйти из функции
        } else {
          index++;
          return false; // выйти 
        }
      }  

      arrText.forEach((symbol, indx) => comparison(symbol, indx)); // каждая буква из введенного слова в функцию     
      
    });

    return [
      {
        text: 'Чубакка',
        value: '1'
      }
    ];
  }
}

new Autocomplete( document.querySelector( '.autocomplete' ));
