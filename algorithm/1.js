function printNumber() {
    for (let i = 1; i <= 5; i++) {
      let row = '';
      for (let j = 1; j <= 5; j++) {
        const hasil = i * j;
        row += hasil + ' ';
      }
      console.log(row);
    }
  }
  
  printNumber();
  