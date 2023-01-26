(() => {
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
    const responseFun = (response) => {
        $('#title').text(response.drinks[0].strDrink);
        $('#category').text(response.drinks[0].strCategory);
        $('#alcoholic').text(response.drinks[0].strAlcoholic);
        $('#instructions').text(response.drinks[0].strInstructions);

        $('#imgPreview').attr('src', `${response.drinks[0].strDrinkThumb}/preview`);
        $('#imgPreview').attr('alt', response.drinks[0].strDrink);
        $('#imgBig').attr('href', response.drinks[0].strDrinkThumb);

        let ingredients = [];
        for (let i = 1; i <= 15; i++) {
            if (response.drinks[0]['strIngredient' + i]) {
                ingredients.push(response.drinks[0]['strIngredient' + i]);
            }
        }
        $('#ingredients').text(`Ingredients: ${ingredients.join(', ')}`);

        $('#imgBig').on('click', e => {
            e.preventDefault();
            $('#modal').removeClass('hide');
            $('#imgFull').attr('src', response.drinks[0].strDrinkThumb);
        });

        $('#modal').on('click', () => {
            $('#modal').addClass('hide');
        });

    };

    const settings = {
        error: (jqXHR, textStatus) => {
            console.log(`Error: ${jqXHR}`);
            console.log(`Error: ${textStatus}`);
        },
        success: responseFun,
    };

    $.ajax(url, settings).done(() => {

    });
})()