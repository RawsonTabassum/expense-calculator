// -------------- preset values -------------- //
document.getElementById('income').value = 10000;
document.getElementById('food').value = 2000;
document.getElementById('rent').value = 2500;
document.getElementById('other').value = 1000;
document.getElementById('save').value = 20;



// -------------- handle error -------------- //
function handleError(errorId, value){
    if(isNaN(value) || value < 0){
        document.getElementById(errorId).style.display = 'block';
        value = 0;
    } else{
        document.getElementById(errorId).style.display = 'none';
    }
    return value;
}



// -------------- extract valid values from input -------------- //
function getValue(id){
    const input = document.getElementById(id).value;
    const inputNumber = parseFloat(input);
    return inputNumber;
}



// -------------- write innerText -------------- //
function writeValue(id, value){
    document.getElementById(id).innerText = value;
}


// -------------- calculate balance -------------- //



// -------------- click-handler: calculate button -------------- //
document.getElementById('minus-expenses').addEventListener('click', function (){
    const income = handleError('notify-income', getValue('income'));
    const rent = handleError('notify-rent', getValue('rent'));
    const food = handleError('notify-food', getValue('food'));
    const other = handleError('notify-other', getValue('other'));

    let totalExpense = 0;
    let balance = 0;

    if(income >0 && rent > 0 && food > 0 && other > 0){
        totalExpense = handleError('notify-negative-balance', income-(rent + food + other));
        if(totalExpense){
            totalExpense = rent + food + other;
            balance = income - totalExpense;
        }


    }
    writeValue('total-expense', totalExpense);
    writeValue('balance', balance);
});



// -------------- click-handler: save button -------------- //
document.getElementById('save-button').addEventListener('click', function(){
    const save = handleError('notify-save', getValue('save'));
    const income = handleError('notify-income', getValue('income'));
    const balanceText = document.getElementById('balance').innerText;
    const balance = parseFloat(balanceText);
    let saveAmount = income * (save/100);
    let remainingBalance = balance-saveAmount;

    if(remainingBalance<0){
        remainingBalance = handleError('notify-less', remainingBalance);
        saveAmount = 0;
    }

    writeValue('saving-amount', saveAmount);
    writeValue('remaining-balance', remainingBalance);
});
