    //untuk tampilan currency, minimum fraction itu untuk menghilangkan ",00"
    export function formatMoney(number){ 
      return number.toLocaleString('in-RP', {
        style : 'currency', 
        currency: 'IDR', 
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    })}


    //bikin format tanggal berdasarkan kriteria Flip, 
    //saya tambahkan parameter time jika suatu saat ingin menampilkan jamnya *true or false
    export function handleFormatDate (dateBefore, time){
        let dateAfter = new Date(dateBefore);
      
        return `${dateAfter.getDate()} ${getMonthNow(dateAfter.getMonth().toString())} ${dateAfter.getFullYear()} ${time ? `${dateAfter.getHours()}:${dateAfter.getMinutes()}:${dateAfter.getSeconds()}`: ''}`;
      };
      
      export function getMonthNow(bulanNow) {
        let bulan = '';
      
        if(bulanNow) {
          if(bulanNow.toString() === '0') {
            bulan = 'Januari';
          } else if(bulanNow.toString() === '1') {
            bulan = 'Februari';
          } else if(bulanNow.toString() === '2') {
            bulan = 'Maret';
          } else if(bulanNow.toString() === '3') {
            bulan = 'April';
          } else if(bulanNow.toString() === '4') {
            bulan = 'Mei';
          } else if(bulanNow.toString() === '5') {
            bulan = 'Juni';
          } else if(bulanNow.toString() === '6') {
            bulan = 'Juli';
          } else if(bulanNow.toString() === '7') {
            bulan = 'Agustus';
          } else if(bulanNow.toString() === '8') {
            bulan = 'September';
          } else if(bulanNow.toString() === '9') {
            bulan = 'Oktober';
          } else if(bulanNow.toString() === '10') {
            bulan = 'November';
          } else if(bulanNow.toString() === '11') {
            bulan = 'Desember';
          }
        }
      
      
      
        return bulan
      }
      