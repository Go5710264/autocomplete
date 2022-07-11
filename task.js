class Autocomplete {
  constructor( container ) {
    this.container = container;
    this.input = container.querySelector( '.autocomplete__input' ); // варианты ответов на запрос
    this.searchInput = container.querySelector( '.autocomplete__search' ); // доступ к полю с поисковым запросом
    this.list = container.querySelector( '.autocomplete__list' ); // список ответов на запрос
    this.valueContainer = container.querySelector( '.autocomplete__value' ); // доступ к контейнеру с полем запроса
    this.valueElement = container.querySelector( '.autocomplete__text-content' ); // поле запроса с введенным значением

    this.registerEvents();
  }

  registerEvents() {
    this.valueContainer.addEventListener( 'click', e => { // обработка события клика на поле ввода
      this.searchInput.classList.add( 'autocomplete__search_active' ); // активация поля ввода????
      this.list.classList.add( 'autocomplete__list_active' ); // активация списка ответов на запрос
      this.searchInput.value = this.valueElement.textContent.trim(); // введенное пользователем значение преобразовать без пробелов 
      this.searchInput.focus(); // взять в фокус поле с запросом

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

  onSelect( item ) { // 
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

    // разбитие введенной фразы на массив из букв
    let arrText = [...text]; // приведение аргумента к массиву строк
    let textLength = arrText.length; // длинна массивва arrText
      
    let arrOption = Array.from(this.input.children); // преобразование дочерних элементов select к массиву
    
    arrOption.forEach((option, i) => { // каждый элемент options
      let arrLetters = option.text; // разбить на массив состоящий из букв 

      // function comparison (arr) {

      //   arr.forEach((elem, indx) => {
      //     if (indx === textLength - 1) {
      //       if (arrLetters.includes(elem)) {
      //         console.log(option.text);
      //         i++;
      //       } else { 
      //         i++;
      //       }
      //     } else if (arrLetters.includes(elem)) {
      //       indx++;
      //     } else {
      //       return false;
      //     }
      //   });
      // }  

      // comparison(arrText);      
      
      if (text.includes(arrLetters)) {
        return [
          {
            text: arrLetters,
            value: arrLetters.value
          }
        ]
      } else {
        return false;
      }
    });

    // return [
    //   {
    //     text: 'Чубакка',
    //     value: '1'
    //   }
    // ];
  }
}

new Autocomplete( document.querySelector( '.autocomplete' ));
